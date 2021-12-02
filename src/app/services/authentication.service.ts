import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  httpClient: HttpClient;
  URL: string = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private localStorge: LocalStorageService
  ) {
    this.httpClient = http;
  }

  public validateUser(formData: any) {
    let extension = 'api/v1/auth/login';
    return this.httpClient.post<any>(this.URL + extension, formData);
  }

  public registerUser(formData: any) {
    let extension = 'api/v1/auth/signup';
    return this.httpClient.post<any>(this.URL + extension, formData);
  }

  public matcher(input1: string, input2: string) {}

  public instantiate() {
    let extension = 'api/v1/user/start';
    return this.httpClient.get<any>(this.URL + extension);
  }

  logout(): void {
    this.localStorge.clear('user');
  }

  isAuthenticated(): Boolean {
    return !!this.localStorge.retrieve('user');
  }
}
