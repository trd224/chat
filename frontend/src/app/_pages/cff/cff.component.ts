import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cff',
  templateUrl: './cff.component.html',
  styleUrls: ['./cff.component.scss']
})
export class CffComponent {

  cffForm!: FormGroup;
  submitted : boolean = false;

  nameData = {
    type: 'text'
  }

  emailData = {
    type: 'email'
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cffForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.cffForm.invalid) {
      this.cffForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
      return;
    }


    console.log(this.cffForm.value);

  }

  onReset(): void {
    this.cffForm.reset();
  }

}
