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
import { AboutComponent } from './_pages/about/about.component';
import { ClickLoggerDirective } from './_directives/click-logger.directive';
import { DirectiveExampleComponent } from './_pages/directive-example/directive-example.component';
import { DateFormatPipe } from './_pipes/date-format.pipe';
import { CustomPipeComponent } from './_pages/custom-pipe/custom-pipe.component';
import { LoginComponent } from './_pages/login/login.component';
import { CffComponent } from './_pages/cff/cff.component';
import { InputComponent } from './_components/input/input.component';
import { FormArrayExampleComponent } from './_pages/form-array-example/form-array-example.component';
import { WorkSpaceComponent } from './_pages/work-space/work-space.component';
import { FormArrayExample1Component } from './_components/form-array-example1/form-array-example1.component';
import { FormArrayExample2Component } from './_components/form-array-example2/form-array-example2.component';



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
    AboutComponent,
    ClickLoggerDirective,
    DirectiveExampleComponent,
    DateFormatPipe,
    CustomPipeComponent,
    LoginComponent,
    CffComponent,
    InputComponent,
    FormArrayExampleComponent,
    WorkSpaceComponent,
    FormArrayExample1Component,
    FormArrayExample2Component,
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
