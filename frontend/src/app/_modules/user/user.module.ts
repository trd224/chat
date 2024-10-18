import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/_shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './_pages/user/user.component';
import { DetailComponent } from './_pages/detail/detail.component';
import { ChatComponent } from './_pages/chat/chat.component';
import { NgCircleProgressModule } from 'ng-circle-progress';



@NgModule({
  declarations: [
  
    UserComponent,
      DetailComponent,
      ChatComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 50,
      outerStrokeWidth: 4,
      innerStrokeWidth: 2,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      titleFontSize: '15'
    })
  ]
})
export class UserModule { 
  constructor(){
    console.log("user module loaded")
  }
}
