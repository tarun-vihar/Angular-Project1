import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  usersList = [];

  public displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'isAdmin',
    'action',
  ];

  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.listUsers().subscribe((res) => (this.usersList = res));
    console.log(this.usersList);
  }

  deleteUser(id: any) {
    this.authService.deleteUser(Number(id)).subscribe(
      (res) => {
        this.router.navigateByUrl('admin/userlist');
      },
      (err: any) => {
        let errorMessage =
          err.error && err.error.detail ? err.error.detail : err.message;
        this.toastr.error(errorMessage);
      }
    );
  }
}
