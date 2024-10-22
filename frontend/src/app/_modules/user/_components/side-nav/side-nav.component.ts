import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_shared/_services/api.service';
import { API_ENDPOINTS } from 'src/app/_shared/_config/const';
import { AuthService } from 'src/app/_shared/_services/auth.service';
import { Router } from '@angular/router';

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

  groups: string[] = ['group1', 'group2']; // Example group list, this can be fetched from backend
  groupName: string = ''; // Selected group name

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router,){
    this.authService.currentUser.subscribe((user:any) => {
      this.currentUser = user;
      this.sender = this.currentUser?.userName;
    });
  }

  ngOnInit(): void {
    this.apiService.get(API_ENDPOINTS.user.all).subscribe((res) => {
      this.users = res;
      console.log(this.users);
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
}
