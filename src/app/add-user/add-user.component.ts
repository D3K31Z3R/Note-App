import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { APIService } from '../api.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  nameToAdd: string;
  addUserCom: boolean;
  userList: User[];

  constructor(private apiService: APIService, private dialogRef:
    MatDialogRef<AddUserComponent>) { }

  ngOnInit(): void {
  }

  addUser = () => {
    this.apiService.AddUser(this.nameToAdd).subscribe((response) => {
      console.log(response);
      this.dialogRef.close();
    });
  }
  close() {
    this.dialogRef.close();

  }
  getUsers() {
    this.apiService.GetUsers().subscribe((data: Array<User>) => {
      console.log(data);
      this.userList = data;
    });
  }
}
