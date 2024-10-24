import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/_shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './_pages/user/user.component';
import { DetailComponent } from './_pages/detail/detail.component';
import { ChatComponent } from './_pages/chat/chat.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SideNavComponent } from './_components/side-nav/side-nav.component';
import { DialogComponent } from './_components/dialog/dialog.component';
import { AlertBoxComponent } from './_components/alert-box/alert-box.component';
import { ConfirmBoxComponent } from './_components/confirm-box/confirm-box.component';
import { ProfileComponent } from './_pages/profile/profile.component';



@NgModule({
  declarations: [
  
    UserComponent,
      DetailComponent,
      ChatComponent,
      SideNavComponent,
      DialogComponent,
      AlertBoxComponent,
      ConfirmBoxComponent,
      ProfileComponent
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
      titleFontSize: '15'
    })
  ]
})
export class UserModule { 
  constructor(){
    //console.log("user module loaded")
  }
}
