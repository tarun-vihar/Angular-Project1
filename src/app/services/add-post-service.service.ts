import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostPayload } from '../add-blog/post-payload';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AddPostServiceService {
  URL: string = environment.baseUrl + 'api/v1/blog/';
  // username = this.localStorge.retrieve('user').username;
  username = 'sandeep-police';

  constructor(
    private httpClient: HttpClient,
    private localStorge: LocalStorageService
  ) {}

  addPost(postPayload: PostPayload) {
    let extension = 'addBlog/' + this.username;
    return this.httpClient.post(this.URL + extension, postPayload);
  }

  getAllPosts(): Observable<Array<any>> {
    let extension = 'get-all-blogs';
    return this.httpClient.get<Array<any>>(this.URL + extension);
  }

  getPost(permaLink: Number): Observable<PostPayload> {
    return this.httpClient.get<PostPayload>(
      'http://localhost:8080/api/posts/get/' + permaLink
    );
  }
}
