import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList: any = new BehaviorSubject<any>([]);
  public searchKey = new BehaviorSubject<String>('');
  constructor() {}

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalAmount();
    console.log(this.cartItemList);
  }

  getTotalAmount(): number {
    let total = 0;
    this.cartItemList.map((item: any) => (total += item.total));
    return total;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((item: any, index: number) => {
      if (item.id === product.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  removeAllItems() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
