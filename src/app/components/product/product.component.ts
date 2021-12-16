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

    console.log(this.cartList);
    this.api.listProducts().subscribe((res) => {
      this.isLoading = false;
      this.productList = res;
      this.productList = this.productList.filter((item: any) => {
        return !item.name || item.name.indexOf('Sample') == -1;
      });
      this.productList.forEach((item: any) => {
        Object.assign(item, {
          quantity: 0,
          total: item.price,
          showQuantity: false,
          title: !!item.title ? item.title : item.name,
          id: !item.id ? item._id : item.id,
          price: !!item.price ? item.price : 0,
        });
      });

      if (this.productList.length != 0 && this.cartList.length != 0) {
        for (let product in this.productList) {
          for (let item in this.cartList) {
            if (this.cartList[item]._id === this.productList[product]._id) {
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
