import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.listUsers().subscribe((res) => (this.usersList = res));
  }
}
