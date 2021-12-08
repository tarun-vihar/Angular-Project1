import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostPayload } from '../add-blog/post-payload';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AddPostServiceService {
  URL: string = environment.baseUrl + 'api/v1/';

  // username = this.localStorge.retrieve('user').username;

  public blog: any = new BehaviorSubject<any>({});
  public userList: any = new BehaviorSubject<any>([]);

  constructor(
    private httpClient: HttpClient,
    private localStorge: LocalStorageService
  ) {}

  getSavedBlog() {
    return this.blog.asObservable();
  }

  saveBlog(blog: any) {
    this.blog.next(blog);
  }

  setAllUsers(users: any) {
    this.userList.next(users);
  }

  getUsersList() {
    return this.userList.asObservable();
  }

  addPost(postPayload: PostPayload) {
    let extension = 'blog/publish';
    return this.httpClient.post(this.URL + extension, postPayload);
  }

  getAllPosts(): Observable<Array<any>> {
    let extension = 'blog/all';
    return this.httpClient.get<Array<any>>(this.URL + extension);
  }

  getPost(permaLink: Number): Observable<PostPayload> {
    return this.httpClient.get<PostPayload>(
      'http://localhost:8080/api/posts/get/' + permaLink
    );
  }

  getAllUsers(): Observable<Array<any>> {
    let extension = 'users/all';
    return this.httpClient.get<Array<any>>(this.URL + extension);
  }

  delete(id: string) {
    throw new Error('Method not implemented.');
  }

  addComment(commentPayload: any) {
    let extension = 'comment/post';
    return this.httpClient.post<any>(this.URL + extension, commentPayload);
  }

  getBlogDetails(blogId: string) {
    console.log(blogId);
    let extension = 'blog/' + blogId;
    return this.httpClient.get(this.URL + extension);
  }

  followerUsers(followingList: any, username: string) {
    let extension = `auth/add-following/${username}`;
    return this.httpClient.post(this.URL + extension, followingList);
  }
}
