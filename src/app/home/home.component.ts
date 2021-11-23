import { Component, OnInit } from '@angular/core';
import { AddPostServiceService } from '../services/add-post-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  blogs!: Observable<Array<any>>;
  constructor(private postService: AddPostServiceService) {}

  ngOnInit(): void {
    this.blogs = this.postService.getAllPosts();
  }
}
