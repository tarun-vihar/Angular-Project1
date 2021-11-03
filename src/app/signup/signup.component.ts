import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private authenticateService: AuthenticationService) {}

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
          // this.router.navigate([this.returnUrl]);
        },
        (error) => {
          alert(error);
        }
      );

    // window.location.reload();
  }
}
