import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/_services/auth.service';
import { mobileNumberValidator, passwordValidator } from 'src/app/_validators';
import { API_ENDPOINTS } from '../../_shared/_config/const';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', [Validators.required]],
      mobile: ['', [Validators.required, mobileNumberValidator]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, passwordValidator]]
    })

    this.signupForm.controls['password'].valueChanges.subscribe(x => {
        this.signupForm.controls['confirmPassword'].updateValueAndValidity()
      }
    )

    
  }

  get f(){
   return this.signupForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if(this.signupForm.invalid){
      return;
    }

    let formData = this.signupForm.value;

    delete formData.confirmPassword;

    this.authService.signup(API_ENDPOINTS.user.signup, formData).subscribe(res => {
      if(res.message == "User created"){
        this.router.navigate(["/login"]);
      }
    })

    
  }
}
