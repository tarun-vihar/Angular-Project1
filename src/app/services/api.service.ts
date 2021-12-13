import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpClient: HttpClient;
  authService: AuthenticationService;
  ProductsURL: string = environment.productAPI;
  URL: string = environment.baseUrl;
  constructor(httpClient: HttpClient, authService: AuthenticationService) {
    this.httpClient = httpClient;
    this.authService = authService;
  }

  getProducsts() {
    return this.httpClient.get<any>(this.ProductsURL).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  listProducts() {
    let extension = `/api/products`;
    const config = this.authService.getTokenHeader();

    return this.httpClient.get<any>(this.URL + extension, config);
  }

  listProductDetails(id: any) {
    let entension = `/api/products/${id}`;
    const config = this.authService.getTokenHeader();
    return this.httpClient.get<any>(this.URL + entension, config);
  }

  deleteProduct(id: any) {
    const config = this.authService.getTokenHeader();
    let extension = ` /api/products/delete/${id}`;
    return this.httpClient.delete(this.URL + extension, config);
  }

  createProduct() {
    const config = this.authService.getTokenHeader();
    let extension = '/api/products/create';
    console.log(config);
    return this.httpClient.post(this.URL + extension, config);
  }

  updateProduct(product: any) {
    let config = this.authService.getTokenHeader();
    let extension = `/api/products/update/${product.id}`;
    return this.httpClient.put(this.URL + extension, product, config);
  }
}
