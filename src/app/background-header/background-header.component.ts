import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-background-header',
  templateUrl: './background-header.component.html',
  styleUrls: ['./background-header.component.css'],
})
export class BackgroundHeaderComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  initialise() {
    this.authService
      .instantiate()
      .pipe(first())
      .subscribe(
        (data) => {
          console.log('Sucess');
          console.log(data);
        },
        (error) => {
          console.log('failed');
        }
      );
  }
}
