import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.scss']
})
export class WorkSpaceComponent {

 demoForm!: FormGroup

 constructor(private fb: FormBuilder){
    this.demoForm = this.fb.group({
      items: this.fb.array([
        this.fb.group({
          name: ['', Validators.required]
        }),
        this.fb.group({
          name: ['', Validators.required]
        })
      ])
    })
 }

 get f(){
  return this.demoForm.get("items") as FormArray
 }

 deleteRow(i: any){
  this.f.removeAt(i);
 }

 addItem(){
  this.f.push(this.fb.group({name: ['', Validators.required]}))
 }

 onSubmit(){
  console.log(this.demoForm.valid);
  console.log(this.demoForm.value);
 }
  

}
