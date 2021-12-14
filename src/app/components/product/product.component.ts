import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public productList: any;
  public isLoading: boolean = true;
  searchKey: string = '';
  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.api.getProducsts().subscribe((res) => {
      this.isLoading = false;
      this.productList = res;
      this.productList.forEach((item: any) => {
        Object.assign(item, {
          quantity: 0,
          total: item.price,
          showQuantity: false,
        });
      });
    });

    this.cartService.searchKey.subscribe((value: any) => {
      this.searchKey = value;
    });
  }

  addTocart(product: any) {
    console.log(product);
    product.showQuantity = true;
    this.cartService.addToCart(product);
  }

  increaseQuantityByOne(product: any) {
    this.cartService.increase(product);
  }

  decreaseQuantityByOne(product: any) {
      this.cartService.decrease(product);
  }
}
