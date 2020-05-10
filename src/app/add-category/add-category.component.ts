import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { Category } from '../interfaces/category';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryList: Category[];
  categoryToAdd: string;

  constructor(private apiService: APIService, private dialogRef:
    MatDialogRef<AddUserComponent>) {
    this.apiService.GetCategories().subscribe((data: Category[]) => {
      console.log(data);
      this.categoryList = data;
      });
  }

  ngOnInit(): void {
  }
  addCategory() {
    this.apiService.PostCategoy(this.categoryToAdd).subscribe(res => {
      console.log(res);
      this.dialogRef.close();
    });
  }
  close(){
    this.dialogRef.close();
  }

}
