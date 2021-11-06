import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private authenticateService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  user: User = <User>{};
  public isValidPassword: boolean = false;
  ngOnInit(): void {}

  comaparePassword(confirmPassword: string, password: string) {
    console.log(confirmPassword);

    this.isValidPassword = confirmPassword === password;
  }

  registerUser(userDetails: any) {
    console.log();
    this.user.email = userDetails.value.userEmail;
    this.user.firstName = userDetails.value.userFirstName;
    this.user.lastName = userDetails.value.userLastName;
    this.user.password = userDetails.value.password;
    this.user.username = userDetails.value.userName;

    console.log(this.user);
    this.authenticateService
      .registerUser(this.user)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.status) {
            this.toastr.success(data.message);
          } else this.toastr.error(data.message);

          console.log(data);
        },
        (error) => {
          this.toastr.error('Unexpected Error , Please retry after some time');
        }
      );

    userDetails.resetForm();
  }
}
