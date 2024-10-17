import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/_shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './_pages/user/user.component';
import { DetailComponent } from './_pages/detail/detail.component';
import { ChatComponent } from './_pages/chat/chat.component';



@NgModule({
  declarations: [
  
    UserComponent,
      DetailComponent,
      ChatComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { 
  constructor(){
    console.log("user module loaded")
  }
}
