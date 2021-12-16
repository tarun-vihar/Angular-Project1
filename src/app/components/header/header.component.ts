import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public totalItems: number = 0;
  public searchKey: string = '';
  isLoggedIn: boolean = false;
  currentUser: User | null;
  constructor(
    private cartService: CartService,
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.cartService.getProducts().subscribe((res: any) => {
      this.totalItems = res.length;
    });

    this.isLoggedIn = this.authService.isLoggedIn();
    if (!!this.isLoggedIn) {
      this.currentUser = this.authService.getUserInfo();
    } else {
      this.currentUser = null;
    }
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((data) => {
      console.log(data, 'data here');
      this.isLoggedIn = Boolean(data);
      this.currentUser = this.authService.getUserInfo();
    });
  }

  search(event: any) {
    this.searchKey = (event.target as HTMLInputElement).value;
    console.log(this.searchKey);
    this.cartService.searchKey.next(this.searchKey);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
