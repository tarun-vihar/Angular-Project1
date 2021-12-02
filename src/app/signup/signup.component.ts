import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';

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
    private toastr: ToastrService,
    private localStorage: LocalStorageService,
    private router: Router
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
        (res) => {
          if (res.status) {
            this.toastr.success(res.message);
            let userDetails = res.data;
            console.log(userDetails);
            this.localStorage.store('user', userDetails[0].username);
            this.router.navigateByUrl('/home');
          } else this.toastr.error(res.message);

          console.log(res);
        },
        (error) => {
          this.toastr.error('Unexpected Error , Please retry after some time');
        }
      );

    userDetails.resetForm();
  }
}
