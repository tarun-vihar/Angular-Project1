import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../user';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup | undefined;
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  authenticateService: AuthenticationService;
  constructor(private authService: AuthenticationService) {
    this.authenticateService = authService;
  }

  @Output() nameSubmit: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {}

  // user: any = {
  //   userName: 'tarunvihar',
  //   password: 'checking',
  // };

  onButtonClick(useInput: any) {
    // console.log(un);
    this.submitted = true;

    this.nameSubmit.emit(useInput);

    console.log(useInput);
    this.authenticateService
      .validateUser(useInput.value)
      .pipe(first())
      .subscribe(
        (data) => {
          // this.router.navigate([this.returnUrl]);
          console.log(data);
        },
        (error) => {
          alert(error);
        }
      );

    useInput.reset();
  }
}
