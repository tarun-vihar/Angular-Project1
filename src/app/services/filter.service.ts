import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  URL: string = environment.baseUrl + 'api/v1/';
  constructor(private httpClient: HttpClient) {}

  getOnlyPositiveCommentedBlogsOfUser(username: string) {
    let extension = `blog/positive/${username}`;
    return this.httpClient.get(this.URL + extension);
  }

  getUserOfPublished(date: string) {
    let extension = `users/mostblogs/${date}`;
    return this.httpClient.get(this.URL + extension);
  }

  getCommonFollowing(user1: string, user2: string) {
    let extension = `users/get-common-following/${user1}/${user2}`;
    return this.httpClient.get(this.URL + extension);
  }

  getUnpublishedUser() {
    let extension = `users/get-unpublished-users`;
    return this.httpClient.get(this.URL + extension);
  }

  getNegativeCommentedUser() {
    let extension = 'users/negative-commented-users';
    return this.httpClient.get(this.URL + extension);
  }

  getNonNegativeCommentedBlogs() {
    let extension = 'users/non-negative-commented-blogs';
    return this.httpClient.get(this.URL + extension);
  }
}
