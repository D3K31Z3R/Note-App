import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { User } from '../interfaces/user';
import { APIService } from '../api.service';
import { Note } from '../interfaces/note';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { of, Observable, from } from 'rxjs';
import { Category } from '../interfaces/category';
import { strict } from 'assert';
import {Form, FormControl} from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  @Input() user: User;
  @Input() dataSource: MatTableDataSource<Note>;
  @Input() userList: User[];
  @Input() noteList: Note[];
  @Input() categoryList: Category[];
  displayedColumns = ['content', 'category'];
  @ViewChild('table') table: MatTable<any>;
  noteFilter = new FormControl();
  categoryFilter = new FormControl();
  filterValue: any;
  selection: string;
  @Input() category: Category;
  content: string;
  edit = false;

  constructor(private apiService: APIService, private dialog: MatDialog) {

   }

  ngOnInit(): void {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyCategoryFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Note, filter: string) => data.category.search(filter) > 0;
  }
  resetFilters() {
    this.filterValue =  {};
    this.filterValue.modelValue = undefined;
    this.dataSource.filter = '';
  }
  Delete(id: number) {
    this.apiService.DeleteNote(id).subscribe((res) => {
      console.log(res);
      console.log(id);
    });

  }
  getNotes(user: User) {
    this.apiService.GetNotes(user.name).subscribe((data: Note[]) => {
      this.dataSource.data = data;
      this.noteList = this.dataSource.data;
      console.log(this.dataSource.data);
      console.log(this.noteList);
    });
  }
  editNoteContent(id: number, content: string) {
    this.apiService.UpdateNoteContent(id, content).subscribe(res => {
      console.log(res);
    });
  }
  editNoteCategory(id: number, category: string) {
    this.apiService.UpdateNoteCategory(id, category).subscribe(res => {
      console.log(this.selection)
      console.log(res);
    });
  }
  editNote() {
    this.edit = true;
  }
  disableEdit() {
    this.edit = false;
  }
}
