import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    isAdmin: new FormControl(false),
  });
  isValidPassword = false;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private toastr: ToastrService
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

  updateUser(form: FormGroup) {
    const { value } = form;
    let userUpdateInfo: User = {
      name: value.name,
      email: value.email,
      password: value.password,
      isAdmin: value.isAdmin,
      id: Number(this.userId),
    };

    this.authService.updateUserByAdmin(userUpdateInfo).subscribe(
      (res) => {
        this.router.navigate(['', 'admin', 'userlist']);
      },
      (err) => {
        let errorMessage =
          err.error && err.error.detail ? err.error.detail : err.message;
        this.toastr.error(errorMessage);
      }
    );
  }

  comaparePassword(confirmPassword: string, password: string) {
    console.log(confirmPassword);

    this.isValidPassword = confirmPassword === password;
  }
}
