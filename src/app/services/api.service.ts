import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpClient: HttpClient;
  ProductsURL: string = environment.productAPI;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getProducsts() {
    return this.httpClient.get<any>(this.ProductsURL).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
