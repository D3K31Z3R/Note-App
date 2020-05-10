import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { User } from '../interfaces/user';
import { APIService } from '../api.service';
import { Note } from '../interfaces/note';
import { throwError } from 'rxjs';
import { Category } from '../interfaces/category';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from '../add-note/add-note.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  @Input() noteList: Note[];
  category: Category;
  content: string;
  noteToAdd = false;
  categoryList: Category[];
  dataSource = new MatTableDataSource<Note>();
  @ViewChild('table') table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  userList: User[];
  viewNotes = false;

  constructor(private apiService: APIService, private dialog: MatDialog) {
    apiService.GetCategories().subscribe((data: Array<Category>) => {
      console.log(data);
      this.categoryList = data;
      });
  }

  ngOnInit(): void {
  }
  deleteUser(user: User) {
    this.apiService.DeleteUser(user.name).subscribe((res) => {
      this.apiService.GetUsers();
    });
  }
  getNotes(user: User) {
    this.apiService.GetNotes(user.name).subscribe((data: Note[]) => {
      this.dataSource.data = data;
      console.log(this.dataSource.data);
      this.viewNotes = true;

    });

  }
  addNote(user: User) {
    this.apiService.AddNote(user.name, this.category.name, this.content).subscribe((res) => {
      console.log(res);
    });
  }
  getUsers() {
    this.apiService.GetUsers().subscribe((data: Array<User>) => {
      console.log(data);
      this.userList = data;
    });
  }
  reload() {
    this.apiService.GetUsers().subscribe((data: Array<User>) => {
      console.log(data);
      this.userList = data;
    });
  }
    openNoteDialog(user: User) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data =  {
        userId: this.user.id
      };
      this.dialog.open(AddNoteComponent, dialogConfig);
    }
}
