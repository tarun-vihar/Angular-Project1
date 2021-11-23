import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
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

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }
}
