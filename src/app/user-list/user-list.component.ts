import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { User } from '../interfaces/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddNoteComponent } from '../add-note/add-note.component';
import { style } from '@angular/animations';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[];
  selectedUser: User;
  addUserCom = false;
  addCatCom = false;
  displayedColumns = ['name', ];

  constructor(private apiService: APIService, private dialog: MatDialog) {
    this.apiService.GetUsers().subscribe((data: Array<User>) => {
      console.log(data);
      this.userList = data;
    });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddUserComponent, dialogConfig);
  }
  openCatDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddCategoryComponent, dialogConfig);
  }

  onSelect(user: User) {
    this.selectedUser = user;
    console.log(user);
    console.log(this.selectedUser);
  }
  getUsers() {
    this.apiService.GetUsers().subscribe((data: Array<User>) => {
      console.log(data);
      this.userList = data;
    });
  }
  deleteUser(user: User) {
    this.apiService.DeleteUser(user.name).subscribe((res) => {
      console.log(res);
    });
  }
  reload() {
    this.apiService.GetUsers().subscribe((data: Array<User>) => {
      console.log(data);
      this.userList = data;
    });
  }
  refresh() {
    window.location.reload();
  }


  ngOnInit(): void {
  }

}
