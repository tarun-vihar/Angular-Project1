import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { AddPostServiceService } from '../services/add-post-service.service';
import { PostPayload } from './post-payload';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');
  tag = new FormControl('');
  constructor(
    private router: Router,
    private addpostService: AddPostServiceService,
    private localStorage: LocalStorageService,
    private toastr: ToastrService
  ) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body,
      tag: this.tag,
    });
    this.postPayload = {
      description: '',
      blogName: '',
      username: '',
      tags: [],
    };
  }

  ngOnInit(): void {}

  addPost() {
    this.postPayload.description = this.addPostForm.get('body')!.value;
    this.postPayload.blogName = this.addPostForm.get('title')!.value;
    let tag = this.addPostForm.get('tag')!.value;
    this.postPayload.tags = tag.trim().split(',');
    this.postPayload.username = this.localStorage.retrieve('user');
    this.addpostService.addPost(this.postPayload).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          this.router.navigateByUrl('/home');
        } else {
          this.toastr.error(res.message);
        }
      },
      (error) => {
        console.log('Failure Unable to post the blog');
      }
    );
  }
}
