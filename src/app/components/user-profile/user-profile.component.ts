import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserServiceService } from 'src/app/shared/user-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  // updateUserForm: FormGroup;

  userId: string = '';
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    isStaff: new FormControl(false),
  });
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthenticationService,
    public userService: UserServiceService
  ) {
    // const {
    //   { _value },
    // } = activateRoute.params;

    activateRoute.params.forEach((item) => {
      if (item.id) this.userId = item.id;
    });

    authService.getUserDetails(this.userId).subscribe((res) => {
      this.form.patchValue(res);
    });
  }

  ngOnInit(): void {}

  updateUser() {}
}
