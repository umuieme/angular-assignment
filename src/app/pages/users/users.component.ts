import { Component } from '@angular/core';
import { ApiService, User } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];
  loading = true;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe({
      next: data => {
        console.log(data);
        this.users = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load data';
        this.loading = false;
      }
    });
  }
}
