import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../_services/chat.service';
import { AuthService } from 'src/app/_shared/_services/auth.service';
import { ApiService } from 'src/app/_shared/_services/api.service';
import { API_ENDPOINTS } from 'src/app/_shared/_config/const';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  users!: any[];
  sender: string = '';
  receiver: string = '';
  message: string = '';
  messages: Array<any> = [];
  // uploadedFiles: Array<any> = [];
  currentUser: any;
  typingIndicator: string = ''; // Indicator for typing status
  loading: boolean = false; // Add loading state
  fileToUpload: File | null = null; // For file upload
  FILE_URL = environment.fileUrl;
  downloadProgressMap: { [fileUrl: string]: number } = {}; // Track progress for each file
  downloadSubscriptions: { [fileUrl: string]: any } = {};
  fileOpenLoading: { [fileUrl: string]: boolean } = {};

  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.sender = this.currentUser?.email;
    });
  }

  ngOnInit(): void {
    this.apiService.get(API_ENDPOINTS.user.all).subscribe((res) => {
      this.users = res;
    });

    // Register the current user after socket connection
    this.chatService.registerUser(this.sender);

    // Listen for new messages
    this.chatService.receiveMessages().subscribe((msg: any) => {
      if (this.sender == msg.sender || msg.sender == this.receiver) {
        this.messages.push(msg); // Automatically update the view
      }
    });

    // Listen for new messages
    this.chatService.receiveUploadedFile().subscribe((msg: any) => {
      this.messages.push(msg); // Automatically update the view
    });

    // Listen for typing events
    this.chatService.receiveTyping().subscribe((data: any) => {
      if (data.sender === this.receiver) {
        this.typingIndicator = `${data.sender} is typing...`;
      }
      setTimeout(() => {
        this.typingIndicator = ''; // Clear typing indicator after a short delay
      }, 3000); // Adjust the timeout as needed
    });

    this.route.queryParams.subscribe((params) => {
      this.receiver = params['receiver'];
      if (this.receiver) {
        this.chatService
          .getHistory(this.sender, this.receiver)
          .subscribe((history: any) => {
            this.messages = history;
          });
      }
    });
  }

  // Fetch chat history
  fetchHistory(receiver: any): void {
    this.loading = true; // Set loading to true when fetching history
    this.receiver = receiver.email;
    this.chatService.getHistory(this.sender, this.receiver).subscribe(
      (history: any) => {
        this.messages = history;
        this.loading = false; // Stop loading when data is fetched
      },
      () => {
        this.loading = false; // Ensure loading stops if there's an error
      }
    );
  }

  goToChat(receiver: any) {
    this.router.navigate(['/users/chat'], {
      queryParams: { receiver: receiver.email },
    });
  }

  // Send a message
  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.sender, this.receiver, this.message);
      this.message = ''; // Clear input after sending
    }
  }

  // Handle file selection
  handleFileInput(event: any): void {
    this.fileToUpload = event.target.files[0];
  }

  // Upload and send file
  sendFile(): void {
    if (this.fileToUpload) {
      this.chatService
        .uploadFile(this.fileToUpload)
        .subscribe((response: any) => {
          const fileName = response.fileName;
          const fileUrl = response.fileUrl;
          const fileType: any = this.fileToUpload?.type.split('/')[0]; // e.g., 'image' or 'application'

          // Send the file via socket
          this.chatService.sendFile(
            this.sender,
            this.receiver,
            fileName,
            fileUrl,
            fileType
          );

          // Reset file input
          this.fileToUpload = null;
          this.inputFile.nativeElement.value = '';
        });
    }
  }

  // Trigger typing event
  onTyping(): void {
    this.chatService.typing(this.sender, this.receiver);
  }

  downloadFile(data: any) {
    const fileUrl = data.fileUrl;
    this.downloadProgressMap[fileUrl] = 0; // Initialize progress for this file
    const downloadSubscription = this.chatService
      .downloadFile(data.fileUrl)
      .subscribe(
        (event) => {
          console.log(event);
          if (event.type === HttpEventType.DownloadProgress) {

            // if (event.total) {
            //   // If the total size is available, calculate progress
            //   this.downloadProgressMap[fileUrl] = Math.round((event.loaded / event.total) * 100);
            // } else {
            //   // If total size is not available, set progress manually or log for debugging
            //   console.warn('Total size is unavailable, cannot track download progress accurately.');
            // }

            this.downloadProgressMap[fileUrl] = Math.round((event.loaded / (event.total)) * 100);
            console.log(`Download Progress: ${this.downloadProgressMap[fileUrl]}%`);
            // You can update a progress bar or display the progress here
          } else if (event instanceof HttpResponse) {
            const blob: Blob = event.body as Blob;
            const url = window.URL.createObjectURL(blob);
            const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Remove special characters
            const a = document.createElement('a');
            a.href = url;
            a.download = timestamp; // Specify the download filename
            a.click();
            window.URL.revokeObjectURL(url); // Cleanup the URL object after download
            delete this.downloadProgressMap[fileUrl];
          }
        },
        (error) => {
          console.error('Download error:', error);
          delete this.downloadProgressMap[fileUrl];
        }
      );

    // Store the subscription for future cancellation
    this.downloadSubscriptions[fileUrl] = downloadSubscription;
  }

  // Method to cancel the download
  cancelDownload(fileUrl: string) {
    const downloadSubscription = this.downloadSubscriptions[fileUrl];
    if (downloadSubscription) {
      downloadSubscription.unsubscribe(); // Cancel the download
      delete this.downloadProgressMap[fileUrl]; // Remove progress tracking
      delete this.downloadSubscriptions[fileUrl]; // Clean up subscription reference
      console.log(`Download for ${fileUrl} cancelled.`);
    }
  }

  openFile(fileUrl: string) {
    this.fileOpenLoading[fileUrl] = true;
    this.chatService.openFile(fileUrl).subscribe(
      (res) => {
        console.log('File opened successfully');
        delete this.fileOpenLoading[fileUrl];
      },
      (error) => {
        console.error('Error opening file:', error);
        delete this.fileOpenLoading[fileUrl];
      }
    );
  }
}
