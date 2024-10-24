import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  groupName: string = '';
  users!: any[]; // All available users
  selectedUsers: any[] = []; // Users selected as chips
  userControl = new FormControl(); // Form control for the input
  filteredUsers!: Observable<any[]>; // Observable for the filtered user list
  currentUser!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.users = data.users; // Assign users passed from parent component
    this.currentUser = data.currentUser;
  }

  ngOnInit(): void {
    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string | null): any[] {
    const filterValue = (value || '').toLowerCase();
    // Return users that match the input and are not already selected
    return this.users.filter(user => 
      user.userName.toLowerCase().includes(filterValue) &&
      !this.selectedUsers.some(selectedUser => selectedUser.userName === user.userName) &&
      user.userName !== this.currentUser // Exclude current user
    );
  }

  onSelection(event: any): void {
    const selectedUser = event.option.value;
    const user = this.users.find(u => u.userName === selectedUser);

    // Add selected user if not already selected
    if (user && !this.selectedUsers.some(u => u.userName === user.userName)) {
      this.selectedUsers.push(user);
      this.userControl.setValue(''); // Clear input after selection
    }
  }

  add(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      const user = this.users.find(u => u.userName === value);
      if (user && !this.selectedUsers.some(u => u.userName === user.userName)) {
        this.selectedUsers.push(user);
        this.userControl.setValue(''); // Clear input after selection
      }
    }
  }

  remove(user: any): void {
    const index = this.selectedUsers.indexOf(user);
    if (index >= 0) {
      this.selectedUsers.splice(index, 1); // Remove user from selectedUsers
      this.userControl.setValue(''); // Optional: Clear input after removal
    }
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close({ groupName: this.groupName, groupMembers: this.selectedUsers });
  }
}
