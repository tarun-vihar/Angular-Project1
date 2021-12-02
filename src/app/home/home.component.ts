import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddPostServiceService } from '../services/add-post-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  blogs!: Observable<Array<any>>;

  @Output() sendBlogEvent = new EventEmitter<any>();

  constructor(
    private postService: AddPostServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogs = this.postService.getAllPosts();
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
}
