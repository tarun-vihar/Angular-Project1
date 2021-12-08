import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  MatCalendarCellClassFunction,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { FilterService } from '../services/filter.service';
import { AddPostServiceService } from '../services/add-post-service.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  public show = false;
  Questions: string[] = [
    'List all the blogs of user X, such that all the comments are positive for these blogs.',
    'List the users who posted the most number of blogs on Selected Date',
    'List the users who are followed by both X and Y. Usernames X and Y are inputs from the user',
    'Display all the users who never posted a blog.',
    'Display all the users who posted some comments, but each of them is negative',
    'Display those users such that all the blogs they posted so far never received any negative comments.',
  ];

  // public usersList: any = [];

  public selectedUser = '';
  public selectedUser1 = '';
  public selectedUser2 = '';

  public index = -1;
  public q1 = false;
  public q2 = false;
  public q3 = false;
  public selectedDate = '';
  public showUserTable = false;
  public showBlogTable = false;
  public filterUserList = [];
  public blogFilterList = [];
  public displayedColumns: string[] = [
    'username',
    'firstName',
    'email',
    'following',
    'follower',
  ];

  public blogDisplayedColumns: string[] = [
    'id',
    'blogName',
    'tagsList',
    'firstName',
    'commentCount',
  ];

  usersList!: Observable<Array<any>>;

  constructor(
    private filterSerive: FilterService,
    private router: Router,
    public datepipe: DatePipe,
    private postService: AddPostServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.usersList = this.postService.getAllUsers();
  }

  clickedRows = new Set<any>();

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selectedDate =
      this.datepipe.transform(event.value, 'yyyy-MM-dd') || '';
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  resetQs() {
    this.q1 = false;
    this.q2 = false;
    this.q3 = false;
    this.index = -1;
  }
  renderHTML(index: number) {
    this.resetQs();
    this.index = index;
    switch (index) {
      case 0:
        this.q1 = true;
        break;
      case 1:
        this.q2 = true;
        break;
      case 2:
        this.q3 = true;
        break;
      default:
      // consorle.log(index);
    }
  }

  getResults(index: number) {
    this.showUserTable = false;
    this.showBlogTable = false;
    switch (index) {
      case 0:
        !!this.selectedUser &&
          this.filterSerive
            .getOnlyPositiveCommentedBlogsOfUser(this.selectedUser)
            .subscribe((res: any) => {
              this.showBlogTable = true;
              this.blogFilterList = res;
            });
        break;
      case 1:
        !!this.selectedDate &&
          this.filterSerive
            .getUserOfPublished(this.selectedDate)
            .subscribe((res: any) => {
              this.filterUserList = res;
              this.showUserTable = true;
            });
        break;
      case 2:
        !!this.selectedUser1 &&
          !!this.selectedUser2 &&
          this.filterSerive
            .getCommonFollowing(this.selectedUser1, this.selectedUser2)
            .subscribe(
              (res: any) => {
                this.filterUserList = res;
                this.showUserTable = true;
              },
              (error) => {
                this.toastr.error(
                  'Unexpected Error , Please retry after some time'
                );
              }
            );
        break;
      case 3:
        this.filterSerive.getUnpublishedUser().subscribe((res: any) => {
          this.filterUserList = res;
          this.showUserTable = true;
        });
        break;
      case 4:
        this.filterSerive.getNegativeCommentedUser().subscribe((res: any) => {
          this.filterUserList = res;
          this.showUserTable = true;
        });
        break;
      case 5:
        this.filterSerive
          .getNonNegativeCommentedBlogs()
          .subscribe((res: any) => {
            this.filterUserList = res;
            this.showUserTable = true;
          });
        dafault: console.log(`For ${index} Do nothing`);
    }
  }
}
