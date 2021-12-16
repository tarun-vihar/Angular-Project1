import { Component, OnInit } from '@angular/core';
import { throttleTime } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotalPrice: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res: any) => {
      this.products = res;
      this.grandTotalPrice = this.cartService.getTotalAmount();
    });
  }

  removeItem(product: any) {
    this.cartService.removeCartItem(product);
  }

  emptyCart() {
    this.cartService.removeAllItems();
  }

  increment(product: any) {
    this.cartService.increase(product);
  }

  decrement(product: any) {
    this.cartService.decrease(product);
  }
}
