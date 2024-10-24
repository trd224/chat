import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent {

  title!: string;

  constructor(
    public dialogRef: MatDialogRef<AlertBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title; 
  }

 
  closeDialog(): void {
    this.dialogRef.close();
  }

}
