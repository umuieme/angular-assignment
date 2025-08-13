import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ApiService, User } from '../../services/api.service';

@Component({
  selector: 'app-add-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  constructor(private apiService: ApiService) { }

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, this.phoneValidator]),
    website: new FormControl('', this.urlValidator)
  });
  submitted = false;
  loading = false;



  get f() {
    return this.userForm.controls;
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const phoneRegex = /^[\d\s\-\+\(\)]{7,15}$/;
    return phoneRegex.test(value) ? null : { invalidPhone: true };
  }

  urlValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
    return urlRegex.test(value) ? null : { invalidUrl: true };
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;

    const newUser: User = {
      id: 0,
      name: this.userForm.value.name ?? '',
      username: this.userForm.value.username ?? '',
      email: this.userForm.value.email ?? '',
      phone: this.userForm.value.phone ?? '',
      website: this.userForm.value.website ?? ''
    };


    this.apiService.addUser(newUser).subscribe({
      next: (res) => {
        alert('User added successfully:\n' + JSON.stringify(res, null, 2));
        this.userForm.reset();
        this.submitted = false;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error adding user', err);
        alert('Failed to add user');
        this.loading = false;
      }
    });
  }
}
