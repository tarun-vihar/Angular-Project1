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
  searchKey: string = '';
  constructor(private api: ApiService, private cartSerivce: CartService) {}

  ngOnInit(): void {
    console.log('In products');
    this.api.getProducsts().subscribe((res) => {
      this.productList = res;
      this.productList.forEach((item: any) => {
        Object.assign(item, { quantity: 1, total: item.price });
      });
    });

    this.cartSerivce.searchKey.subscribe((value: any) => {
      this.searchKey = value;
    });
  }

  addTocart(product: any) {
    this.cartSerivce.addToCart(product);
  }
}
