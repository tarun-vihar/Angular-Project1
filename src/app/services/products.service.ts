import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/IProduct';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: IProduct[] = [];
  products$ = new BehaviorSubject<IProduct[]>(this.products);
  productsLoaded: boolean = false;
  URL = environment.baseUrl;
  // URL = 'http://localhost:8000';
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  loadProducts(): void {
    if (this.productsLoaded) {
      this.setProducts(this.products);
      return;
    }
    const endPoint = '/api/products/';
    this.http.get(this.URL + endPoint).subscribe((data: any) => {
      data.map((value: any) => {
        value.id = value._id;
        value.price = !!value.price ? +value.price : 0;
      });
      this.setProducts(data);
      this.productsLoaded = true;
    });
  }

  setProducts(products: IProduct[]): void {
    this.products = products;
    this.products$.next(this.products);
  }

  createProduct() {
    // TODO: Integrate add product api.
    const config = this.authService.getTokenHeader();
    let extension = '/api/products/create';
    console.log(config);
    this.http.post(this.URL + extension, {}, config).subscribe(
      (res: any) => {
        const { name, image, description, price, _id } = res;
        const product: IProduct = {
          name,
          image,
          description,
          price,
          id: _id,
          available: false,
          _id: 0,
        };
        this.setProducts(this.products.concat([product]));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // createProduct() {
  //   return;
  // }

  deleteProductById(id: number) {
    // TODO: integrate api
    console.log(id);
    const config = this.authService.getTokenHeader();
    let extension = `/api/products/delete/${id}`;
    return this.http
      .delete(this.URL + extension, config)
      .subscribe((res: any) => {
        const products = this.products.filter((p) => p.id !== id);
        this.setProducts(products);
        return of(false);
      });
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductInfoById(id: number): Observable<IProduct | null> {
    this.loadProducts();
    console.log(this.products);
    const productIndex = this.products.findIndex((p) => p.id === id);
    return of(productIndex > -1 ? this.products[productIndex] : null);
  }

  updateProduct(product: IProduct) {
    let config = this.authService.getTokenHeader();
    let extension = `/api/products/update/${product.id}`;
    this.http.put(this.URL + extension, product, config).subscribe(
      (res) => {
        this.setProducts(this.products.concat([product]));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
