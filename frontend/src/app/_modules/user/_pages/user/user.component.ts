import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from 'src/app/_shared/_config/const'; 
import { ApiService } from 'src/app/_shared/_services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users!: any[];

  constructor(
    private apiService: ApiService,
    private router: Router
  ){}

  ngOnInit(): void {
    //getAllUsers
    this.apiService.get(API_ENDPOINTS.user.current).subscribe(res => {
      this.users = res;
    }, err => {

    })
  }

  goToDetail(user: any){
    //console.log(user._id);
    this.router.navigate([`/users/${user._id}`])
  }
}
