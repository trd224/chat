import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { API_ENDPOINTS } from 'src/app/_shared/_config/const'; 
import { ApiService } from 'src/app/_shared/_services/api.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit {

  user: any;
  constructor(private apiService: ApiService, private route: ActivatedRoute){}

  ngOnInit(): void {

    let userid = this.route.snapshot.params['id'];

   
    //getUserById
    this.apiService.get(API_ENDPOINTS.user.byId(userid)).subscribe({next: (res) => {
      this.user = res;
    },error: (err) => {

    }})
  }

  getUserById(){
    
  }

  ngAfterViewInit(): void {
    
  }
}
