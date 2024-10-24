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
  groupId: string = '';
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
    this.getUsers();
    this.getGroups();
    this.route.queryParams.subscribe((params) => {
      if(params['receiver']){
        this.receiver = params['receiver'];
        this.groupId = "";
      }
      else if(params['group']){
        this.groupId = params['group'];
        this.receiver = ""
      }
    })
    
  }

  getUsers(){
    this.apiService.get(API_ENDPOINTS.user.all).subscribe((res) => {
      this.users = res;
    });
  }
  getGroups(){
    this.apiService.get(API_ENDPOINTS.chat.group.byCurrentUserId).subscribe((res) => {
      this.groups = res;
    });
  }

  goToChat(receiver: any) {
    this.router.navigate(['/users/chat'], {
      queryParams: { receiver: receiver._id },
    });
  }

  goToGroupChat(group: any){
    this.router.navigate(['/users/chat'], {
      queryParams: { group: group._id },
    });
  }

  createGroup(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '900px',
      data: { 
        users:  this.users,
        currentUser: this.sender
       } // Optional data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.chatService.createGroup(result).subscribe((res:any) => {
          this.getGroups();
        })
      }
      
    });
  }
}
