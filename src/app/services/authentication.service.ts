import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  httpClient: HttpClient;
  URL: string = environment.baseUrl;

  constructor(private http: HttpClient) {
    this.httpClient = http;
  }

  public validateUser(formData: any) {
    let extension = 'api/users/login/';
    return this.httpClient.post<any>(this.URL + extension, formData);
  }

  public registerUser(formData: any) {
    let extension = 'api/users/register';
    return this.httpClient.post<any>(this.URL + extension, formData);
  }

  public matcher(input1: string, input2: string) {}

  // public instantiate() {
  //   let extension = 'api/v1/user/start';
  //   return this.httpClient.get<any>(this.URL + extension);
  // }

  public isLoggedIn() {
    return localStorage.getItem('userInfo');
  }

  public isAdmin() {
    let userInfo: any = localStorage.getItem('userIndo');
    return !!userInfo && !!JSON.parse(userInfo['isAdmin']);
  }

  public logout() {
    localStorage.removeItem('userInfo');
  }
}
