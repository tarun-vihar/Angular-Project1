import { Component, OnInit } from '@angular/core';
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
  public currentUser: any = '';
  constructor(
    private cartService: CartService,
    private authService: AuthenticationService
  ) {
    this.cartService.getProducts().subscribe((res: any) => {
      this.totalItems = res.length;
    });

    if (!!this.authService.currentUserValue) {
      this.currentUser = this.authService.currentUserValue.data;
    }
  }

  ngOnInit(): void {}

  search(event: any) {
    this.searchKey = (event.target as HTMLInputElement).value;

    this.cartService.searchKey.next(this.searchKey);
  }
}
