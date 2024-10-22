import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/_services/auth.service';
import { API_ENDPOINTS } from '../../_shared/_config/const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
   
    })

   

    
  }

  get f(){
   return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }

    let formData = this.loginForm.value;

    this.authService.login(API_ENDPOINTS.user.login, formData).subscribe(res => {
      if(res && res.token){
        this.router.navigate(["/users/chat"]);
      }
    })

    
  }
}

