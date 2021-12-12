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
    return this.httpClient.get<any>(this.URL + extension);
  }

  listProductDetails(id: any) {
    let entension = `/api/products/${id}`;
    return this.httpClient.get<any>(this.URL + entension);
  }

  deleteProduct(id: any) {
    const config = this.authService.getTokenHeader();
    let extension = ` /api/products/delete/${id}`;
    return this.httpClient.delete(this.URL + extension, config);
  }

  createProduct() {}
}
