import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
    let extension = 'api/v1/user/login';
    return this.httpClient.post<any>(this.URL + extension, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  public registerUser(formData: any) {
    let extension = 'api/v1/user/signup';
    return this.httpClient.post<any>(this.URL + extension, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  public matcher(input1: string, input2: string) {}
}
