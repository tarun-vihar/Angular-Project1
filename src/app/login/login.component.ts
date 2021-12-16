import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup | undefined;
  loading = false;
  submitted = false;
  showHeading = false;
  responseMessgae: string = '';
  returnUrl: string | undefined;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  @Output() nameSubmit: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {}

  // user: any = {
  //   userName: 'tarunvihar',
  //   password: 'checking',
  // };

  public login() {
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {},
      (error) => {}
    );
  }

  public get f() {
    return this.loginForm.controls;
  }
}
