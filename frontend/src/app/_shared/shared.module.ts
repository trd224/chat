import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './_components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CardComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SharedModule { }
