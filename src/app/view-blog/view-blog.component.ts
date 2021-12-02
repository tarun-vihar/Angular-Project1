import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { AddPostServiceService } from '../services/add-post-service.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css'],
})
export class ViewBlogComponent implements OnInit {
  public post: any = {};
  public comments: any = [];
  commentForm: FormGroup;
  commentPayload: any = {};

  text = new FormControl('');
  sentiment = new FormControl('');
  isSameUser: boolean = false;
  blogId: string = '';
  constructor(
    private postService: AddPostServiceService,
    private localStorage: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
    private ac: ActivatedRoute
  ) {
    this.commentForm = new FormGroup({
      text: this.text,
      sentiment: this.sentiment,
    });
  }

  ngOnInit(): void {
    this.postService.getSavedBlog().subscribe((res: any) => {
      this.post = res;
      this.comments = this.post.commentList;
    });

    this.isSameUser = this.post.userName == this.localStorage.retrieve('user');

    this.ac.params.subscribe((param) => {
      this.blogId = param.blogId;
    });

    // this.postService.getBlogDetails(this.blogId).subscribe((res) => {
    //   console.log(res);
    //   this.post = res;
    // });

    console.log(this.post);
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text')!.value;
    this.commentPayload.sentiment = this.commentForm.get('sentiment')!.value;

    this.commentPayload.username = this.localStorage.retrieve('user');

    this.commentPayload.blogId = this.post.id;

    console.log(this.commentPayload);

    this.postService.addComment(this.commentPayload).subscribe(
      (res) => {
        if (!!res && res.status) {
          this.toastr.success(res.message);
          this.router.navigateByUrl('/home');
        } else {
          this.toastr.error(res.message);
        }
      },
      (error) => {
        this.toastr.error('Unexpected Error , Please retry after some time');
      }
    );
  }
}
