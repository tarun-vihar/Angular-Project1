import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  httpClient: HttpClient;
  URL: string = environment.baseUrl;
  userLoginStaus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.httpClient = http;
  }

  public validateUser(formData: any) {
    let extension = '/api/users/login/';
    return this.httpClient.post<any>(this.URL + extension, formData);
  }

  public registerUser(formData: any) {
    let extension = '/api/users/register';
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
    let userInfo: any = localStorage.getItem('userInfo');
    return !!userInfo && !!JSON.parse(userInfo['isAdmin']);
  }

  public logout() {
    localStorage.removeItem('userInfo');
  }

  public listUsers() {
    const config = this.getTokenHeader();
    let extension = '/api/users';
    console.log(config);
    return this.httpClient.get<any>(this.URL + extension, config);
  }

  public getUserDetails(id: any) {
    const config = this.getTokenHeader();
    let extension = `/api/users/${id}`;
    console.log(extension);
    return this.httpClient.get<any>(this.URL + extension, config);
  }

  public updateUserProfile(user: User) {
    const config = this.getTokenHeader();
    let extension = ' /api/users/profile/update';
    return this.httpClient.put<any>(this.URL + extension, user, config);
  }

  public updateUser(user: User) {
    const config = this.getTokenHeader();
    let currenUserID = this.getCurrentUserId();
    let extension = `/api/users/update/currenUserID`;
    return this.httpClient.put<any>(this.URL + extension, user, config);
  }

  public deleteUser(id: number) {
    const config = this.getTokenHeader();
    let extension = `/api/users/delete/${id}`;
    console.log(config);
    return this.httpClient.delete<any>(this.URL + extension, config);
  }

  getTokenHeader() {
    let userInfo: any = localStorage.getItem('userInfo');

    if (!!userInfo) {
      const { token } = JSON.parse(userInfo);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return config;
    } else {
      return {};
    }

    console.log(userInfo);

    // =
  }

  getCurrentUserId() {
    let userInfo: any = localStorage.getItem('userInfo');
    return !!userInfo ? JSON.parse(userInfo._id) : '';
  }
}
