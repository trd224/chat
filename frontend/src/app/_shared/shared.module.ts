import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './_components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';  // Import MatChipsModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Required for the cancel icon
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Import MatAutocompleteModule


@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  exports: [
    CardComponent,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule
  ],
})
export class SharedModule { }
