import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';

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
  authenticateService: AuthenticationService;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private localStorage: LocalStorageService
  ) {
    this.authenticateService = authService;
  }

  @Output() nameSubmit: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {}

  // user: any = {
  //   userName: 'tarunvihar',
  //   password: 'checking',
  // };

  onButtonClick(useInput: any) {
    console.log('test');

    this.nameSubmit.emit(useInput);

    this.authenticateService
      .validateUser(useInput.value)
      .pipe(first())
      .subscribe(
        (res) => {
          if (res.status) {
            this.toastr.success(res.message);
            this.localStorage.store('user', res.data);
            this.router.navigateByUrl('/home');
          } else {
            this.toastr.error(res.message);
          }
        },
        (error) => {
          this.toastr.error('Unexpected Error , Please retry after some time');
        }
      );

    useInput.resetForm();
  }
}
