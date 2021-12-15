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
  public cartList: any;
  constructor(private api: ApiService, private cartService: CartService) {}

  // ngOnInit(): void {
  //   this.api.getProducsts().subscribe((res) => {
  //     this.isLoading = false;
  //     this.productList = res;
  //     this.productList.forEach((item: any) => {
  //       Object.assign(item, {
  //         quantity: 0,
  //         total: item.price,
  //         showQuantity: false,
  //       });
  //     });
  //   });

  //   this.cartService.searchKey.subscribe((value: any) => {
  //     this.searchKey = value;
  //   });
  // }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res: any) => {
      this.cartList = res;
    });

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
      if (this.productList.length != 0 && this.cartList.length != 0) {
        for (let product in this.productList) {
          for (let item in this.cartList) {
            if (this.cartList[item].id === this.productList[product].id) {
              this.productList[product] = this.cartList[item];
            }
          }
        }
      }
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
