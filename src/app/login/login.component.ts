import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

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
  authenticateService: AuthenticationService;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
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

    console.log(useInput);
    this.authenticateService
      .validateUser(useInput.value)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.status) {
            this.toastr.success(data.message);
          } else this.toastr.error(data.message);
        },
        (error) => {
          this.toastr.error('Unexpected Error , Please retry after some time');
        }
      );

    useInput.resetForm();
  }
}
