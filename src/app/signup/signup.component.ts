import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    private toastr: ToastrService,
    private router: Router
  ) {
    // if (!!this.authenticateService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

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
    this.user.name = userDetails.value.userFirstName;
    this.user.password = userDetails.value.password;

    console.log(this.user);
    this.authenticateService
      .registerUser(this.user)
      .pipe(first())
      .subscribe(
        (data) => {
          localStorage.setItem('userInfo', JSON.stringify(data));
          this.router.navigateByUrl('');
        },
        (err) => {
          let errorMessage =
            err.error && err.error.detail ? err.error.detail : err.message;
          this.toastr.error(errorMessage);
        }
      );
  }
}
