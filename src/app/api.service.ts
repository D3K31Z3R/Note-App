import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  GetUsers = () => {
    return this.http.get('https://galvanized-obtainable-kilometer.glitch.me/users/');
  }
  GetUser = (name: string) => {
    return this.http.get('https://galvanized-obtainable-kilometer.glitch.me/users?name=' + name);
  }
  AddUser = (value: string) => {
    return this.http.post('https://galvanized-obtainable-kilometer.glitch.me/users', {name: value});
  }
  AddNote = (name: string, category: string, note: string) => {
    return this.http.post('https://galvanized-obtainable-kilometer.glitch.me/notes?name=' + name, {content: note, category: category});
  }
  DeleteUser = (name: string) => {
    return this.http.delete('https://galvanized-obtainable-kilometer.glitch.me/users?name=' + name);
  }
  DeleteNote = (id: number) => {
    return this.http.delete('https://galvanized-obtainable-kilometer.glitch.me/notes?id=' + id);
  }
  GetNotes = (name: string) => {
    return this.http.get('https://galvanized-obtainable-kilometer.glitch.me/notes?name=' + name);
  }
  PostCategoy = (category: string) => {
    return this.http.post('https://galvanized-obtainable-kilometer.glitch.me/categories', {name: category});
  }
  GetCategories = () => {
    return this.http.get('https://galvanized-obtainable-kilometer.glitch.me/categories');
  }
  UpdateNoteContent = (noteId: number, note: string) => {
    return this.http.patch('https://galvanized-obtainable-kilometer.glitch.me/notes?id=' + noteId, {content: note});
  }
  UpdateNoteCategory = (noteId: number, name: string) => {
    return this.http.patch('https://galvanized-obtainable-kilometer.glitch.me/notes?id=' + noteId, {category: name});
  }
}
