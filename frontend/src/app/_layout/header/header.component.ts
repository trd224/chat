import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/_services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;

  constructor(private authService: AuthService, private router: Router){
    this.authService.currentUser.subscribe((user:any) => {
      this.currentUser = user;
    })
  }

  ngOnInit(): void {
  } 

  logout(){
    this.authService.logout()?.subscribe(res => {
      if(res == null){
        this.router.navigate(["/"]);
      }
    });
  }
}
