import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-background-header',
  templateUrl: './background-header.component.html',
  styleUrls: ['./background-header.component.css'],
})
export class BackgroundHeaderComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  initialise() {
    this.authService
      .instantiate()
      .pipe(first())
      .subscribe(
        (data) => {
          if (!!data && data.status) {
            this.toastr.success(data.message);
          } else this.toastr.error(data.message);
        },
        (error) => {
          this.toastr.error('Upexpected Error');
        }
      );
  }
}
