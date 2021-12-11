import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  @Output() nameSubmit: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {}

  // user: any = {
  //   userName: 'tarunvihar',
  //   password: 'checking',
  // };

  onButtonClick(useInput: any) {
    this.nameSubmit.emit(useInput);

    console.log(useInput);
    this.authService
      .validateUser(useInput.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.toastr.success('Successfully Resgitered');

          localStorage.setItem('userInfo', JSON.stringify(data));
          this.router.navigateByUrl('/home');
        },
        (error) => {
          this.toastr.error();
        }
      );

    // useInput.resetForm();
  }
}
