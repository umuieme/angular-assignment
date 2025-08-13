import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private apiUrl = 'https://jsonplaceholder.typicode.com/users'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    console.log('Fetching users from API');
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    console.log('Adding user:', user);
    return this.http.post<User>(this.apiUrl, user);
  }
}

