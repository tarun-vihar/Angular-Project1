import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
  user: User = <User>{};
  public isValidPassword: boolean = false;
  signUpForm: FormGroup;
  constructor(
    private authenticateService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.signUpForm = new FormGroup(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      },
      {
        validators: [this.checkPasswords],
      }
    );
  }

  ngOnInit(): void {}

  private checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    console.log(pass == confirmPass);
    return pass === confirmPass ? null : { notSame: true };
  };

  public get f() {
    return this.signUpForm.controls;
  }

  register() {
    this.authenticateService.register(this.signUpForm.value).subscribe(
      (data) => {},
      (error) => {
        // this.toastr.error('Registration Failed', error);
        this.toastr.error('Register Failed');
      }
    );
  }
}
