import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(
    private router: Router,
    private addpostService: AddPostServiceService
  ) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body,
    });
    this.postPayload = {
      description: '',
      blogName: '',
    };
  }

  ngOnInit(): void {}

  addPost() {
    this.postPayload.description = this.addPostForm.get('body')!.value;
    this.postPayload.blogName = this.addPostForm.get('title')!.value;
    this.addpostService.addPost(this.postPayload).subscribe(
      (data) => {
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.log('Failure Response');
      }
    );
  }
}
