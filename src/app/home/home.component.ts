import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddPostServiceService } from '../services/add-post-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  blogs!: Observable<Array<any>>;
  userList!: Observable<Array<any>>;
  selectedFollowing: any;
  following = new FormControl();

  @Output() sendBlogEvent = new EventEmitter<any>();

  constructor(
    private postService: AddPostServiceService,
    private router: Router,
    private toastr: ToastrService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.blogs = this.postService.getAllPosts();
    this.userList = this.postService.getAllUsers();

    this.userList.subscribe((res) => {
      this.postService.setAllUsers(res);
    });
  }

  delete(id: string) {
    this.postService.delete(id);
    this.router.navigateByUrl('/home');
  }

  readMore(blog: any) {
    this.sendBlogEvent.emit(blog);
    this.postService.saveBlog(blog);
    // this.router.navigateByUrl('/show-details');
    this.router.navigate(['blog', blog.id]);
  }

  addFollowing() {
    console.log(this.selectedFollowing);
    let user = this.localStorage.retrieve('user');
    if (!!user) {
      this.postService.followerUsers(this.selectedFollowing, user).subscribe(
        (res) => this.toastr.success('Successfully added followers'),
        (err: any) => this.toastr.success('Unexpected  Errors While ')
      );
    } else this.toastr.error('Login to add follower');
  }
}
