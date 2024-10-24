import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent {

  title!: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title; 
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close({ msg: 'yes' });
  }

}
