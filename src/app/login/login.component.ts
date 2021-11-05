import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

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
    private router: Router
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
    this.submitted = true;
    this.showHeading = false;
    this.nameSubmit.emit(useInput);

    console.log(useInput);
    this.authenticateService
      .validateUser(useInput.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.showHeading = true;
          this.responseMessgae = data.message;
        },
        (error) => {
          this.showHeading = true;
          this.responseMessgae = 'Please retry after 10 min';
          alert(error);
        }
      );

    // window.location.reload();
  }
}
