import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  updateUserForm: FormGroup;
  requestPayLoad: User;
  constructor() {
    this.updateUserForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      isAdmin: new FormControl(''),
    });
    this.requestPayLoad = {
      name: '',
      email: '',
      password: '',
      isAdmin: false,
    };
  }

  ngOnInit(): void {}

  updateUser() {}
}
