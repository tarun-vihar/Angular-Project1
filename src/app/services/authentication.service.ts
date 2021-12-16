import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { StorageService } from '../common/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  httpClient: HttpClient;
  URL: string = environment.baseUrl;
  userLoginStaus = new BehaviorSubject<boolean>(false);
  authState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {
    this.httpClient = http;
  }

  public register(user: User): Observable<User> {
    user.name = user.firstName + ' ' + user.lastName;
    delete user.firstName;
    delete user.lastName;
    delete user.confirmPassword;
    return new Observable((observer) => {
      const endPoint = '/api/users/register';
      this.http.post<any>(this.URL + endPoint, user).subscribe(
        (data) => {
          this.setStorage(data);
          this.routeToProducts();
          observer.next(data);
          observer.complete();
        },
        (error) => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }

  public matcher(input1: string, input2: string) {}

  public login(user: Pick<User, 'email' | 'password'>): Observable<User> {
    const loginPostData = {
      username: user.email,
      password: user.password,
    };
    return new Observable((observer) => {
      const endPoint = '/api/users/login/';
      this.http.post<any>(this.URL + endPoint, loginPostData).subscribe(
        (data) => {
          this.setStorage(data);
          this.routeToProducts();
          observer.next(data);
          observer.complete();
        },
        (error) => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }
  public isLoggedIn(): boolean {
    return localStorage.getItem('userInfo') != null;
  }

  // public loginStatus() {
  //   return localStorage.getItem('userInfo') != null;
  // }

  public getUserInfo(): User {
    return this.storageService.get('userInfo');
  }

  public isAdmin(): boolean {
    let userInfo: any = this.storageService.get('userInfo');
    return !!userInfo && !!JSON.parse(userInfo['isAdmin']);
  }

  public logout(): boolean {
    this.storageService.remove('userInfo');
    this.authState.next(false);
    return true;
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
    let extension = `/api/users/profile/update/${user.id}`;
    return this.httpClient.put<any>(this.URL + extension, user, config);
  }

  public updateUserByAdmin(user: User) {
    const config = this.getTokenHeader();
    console.log(user);
    let extension = `/api/users/update/${user.id}`;
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

  private setStorage(userInfo: Partial<User>): void {
    this.storageService.add('userInfo', userInfo);
    this.authState.next(true);
  }

  private routeToProducts() {
    this.router.navigate(['', 'products']);
  }
}
