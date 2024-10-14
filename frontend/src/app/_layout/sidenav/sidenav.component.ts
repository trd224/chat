import { Component, OnInit } from '@angular/core';
import { SIDEBAR_NAVIGATION } from 'src/app/_config/navigation';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  navigation: any[] = SIDEBAR_NAVIGATION;
  constructor(){

  }

  ngOnInit(): void {
    
  }
}
