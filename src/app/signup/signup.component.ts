import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../user';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor() {}

  public isValidPassword: boolean = false;
  ngOnInit(): void {}

  comaparePassword(confirmPassword: string, password: string) {
    console.log(confirmPassword);

    this.isValidPassword = confirmPassword === password;
  }
}
