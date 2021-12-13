import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public currentUser: any;
  constructor(
    private cartService: CartService,
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.cartService.getProducts().subscribe((res: any) => {
      this.totalItems = res.length;
    });

    console.log(!!this.currentUser);
    let userInfo = this.authService.isLoggedIn();
    if (!!userInfo) this.currentUser = JSON.parse(userInfo);
    else this.currentUser = '';
  }

  ngOnInit(): void {}

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
