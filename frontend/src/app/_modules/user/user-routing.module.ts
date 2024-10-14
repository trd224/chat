import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './_pages/user/user.component';
import { DetailComponent } from './_pages/detail/detail.component';
import { authGuard } from 'src/app/_shared/_guards/auth.guard';
import { ChatComponent } from './_pages/chat/chat.component';

const routes: Routes = [
  {path:"list", component: UserComponent, canActivate: [authGuard]},
  {path:"list/:id", component: DetailComponent, canActivate: [authGuard]},
  {path:"chat", component: ChatComponent, canActivate: [authGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
