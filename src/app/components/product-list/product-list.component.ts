import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ColDef } from 'ag-grid-community';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IProduct } from 'src/app/models/IProduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  productsCols: string[] = ['sno', 'image', 'name', 'price', 'actions'];
  products: IProduct[] = [
    {
      name: 'Product1',
      image: '',
      price: 1,
      description: 'ajdfl',
      available: true,
      id: 1,
      _id: 1,
    },
  ];
  subscriptions: Subscription[] = [];

  constructor(private productsSrv: ProductsService) {}

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit(): void {
    this.productsSrv.loadProducts();

    const productsRef = this.productsSrv.products$.subscribe(
      (res: IProduct[]) => {
        console.log('res:: ', res);
        this.products = res;
      }
    );

    this.subscriptions = this.subscriptions.concat([productsRef]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  addProduct() {
    this.productsSrv.createProduct();
    // this.router.navigate(['', 'products', 'add']);
  }

  // updateProduct(product: IProduct) {
  //   console.log('Update product::', product);
  //   // this.router.navigate(['', 'products', 'edit', product.id]);
  // }

  deleteProduct(id: number) {
    this.productsSrv.deleteProductById(id);
  }
}
