import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_shared/_services/api.service';
import { API_ENDPOINTS } from 'src/app/_shared/_config/const';
import { AuthService } from 'src/app/_shared/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ChatService } from '../../_services/chat.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  users!: any[];
  currentUser: any;
  sender: string = '';
  receiver: string = '';

  groups!: any[];
  //groupName: string = ''; // Selected group name

  constructor(
    private apiService: ApiService, 
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private chatService: ChatService
  ){
    this.authService.currentUser.subscribe((user:any) => {
      this.currentUser = user;
      this.sender = this.currentUser?.userName;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.receiver = params['receiver'];
      if (this.receiver) {
        this.getUsers();
        this.getGroups();
      }})
    
  }

  getUsers(){
    this.apiService.get(API_ENDPOINTS.user.all).subscribe((res) => {
      this.users = res;
      console.log(this.users)
    });
  }
  getGroups(){
    this.apiService.get(API_ENDPOINTS.chat.group.all).subscribe((res) => {
      this.groups = res;
    });
  }

  goToChat(receiver: any) {
    this.router.navigate(['/users/chat'], {
      queryParams: { receiver: receiver._id },
    });
  }

  goToGroupChat(groupName: any){
    this.router.navigate(['/users/chat'], {
      queryParams: { group: groupName },
    });
  }

  createGroup(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { message: 'Hello from the dialog!' } // Optional data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.chatService.createGroup(result).subscribe((res:any) => {
        this.getGroups();
      })
    });
  }
}
