import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtInterceptor } from 'src/app/_interceptors/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/_interceptors/error.interceptor';

import { SharedModule } from './_shared/shared.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './_layout/layout.component';
import { HeaderComponent } from './_layout/header/header.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { SidenavComponent } from './_layout/sidenav/sidenav.component';
import { Page404Component } from './_pages/page404/page404.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { SignupComponent } from './_pages/signup/signup.component';



import { DateFormatPipe } from './_pipes/date-format.pipe';

import { LoginComponent } from './_pages/login/login.component';





@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    Page404Component,
    DashboardComponent,
    SignupComponent,

    DateFormatPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
