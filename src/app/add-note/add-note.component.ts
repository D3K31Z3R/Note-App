import { Component, OnInit, Input, Inject } from '@angular/core';
import { User } from '../interfaces/user';
import { Category } from '../interfaces/category';
import { APIService } from '../api.service';
import { Note } from '../interfaces/note';
import { Form } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  @Input() user: User;
  category: string;
  content: string;
  note: Note;
  @Input() categoryList: Category[];
  selectedCategory: string;
  noteForm: Form;

  constructor(private apiService: APIService)
    {
    this.apiService.GetCategories().subscribe((data: Category[]) => {
      console.log(data);
      this.categoryList = data;
      });
  }

  ngOnInit(): void {
     this.apiService.GetCategories().subscribe((data: Category[]) => {
      console.log(data);
      this.categoryList = data;
      });
  }
  addNote() {
    this.apiService.AddNote(this.user.name, this.selectedCategory, this.content).subscribe((res) => {
            console.log(res);
            console.log(this.content, this.category, this.user);

    });
  }
}
