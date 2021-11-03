import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public totalItems: number = 0;
  public searchKey: string = '';
  constructor(private cartService: CartService) {
    this.cartService.getProducts().subscribe((res: any) => {
      this.totalItems = res.length;
    });
  }

  ngOnInit(): void {}

  search(event: any) {
    this.searchKey = (event.target as HTMLInputElement).value;

    this.cartService.searchKey.next(this.searchKey);
  }
}
