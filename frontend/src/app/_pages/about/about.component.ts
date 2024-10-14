import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutForm!: FormGroup;
  detailsBool: boolean = false;

  constructor(private fb: FormBuilder){
    
  }

  ngOnInit(): void {
    this.aboutForm = this.fb.group({
      choice: ['no', Validators.required],
      details: ['']
    })

    this.aboutForm.controls['choice'].valueChanges.subscribe(value => {
      if(value == 'yes'){
        this.aboutForm.controls['details'].setValidators([Validators.required])
      }
      else{
        this.aboutForm.controls['details'].clearValidators();
      }
      this.aboutForm.controls['details'].updateValueAndValidity();
    })
  }

  onOptionChange(event: any){
    ////console.log(event.target.value);
    if(event.target.value == 'yes'){
      this.detailsBool = true;
    }
    else{
      this.detailsBool = false;
    }
  }

  onSubmit(){
    //console.log(this.aboutForm.valid)
  }
}
