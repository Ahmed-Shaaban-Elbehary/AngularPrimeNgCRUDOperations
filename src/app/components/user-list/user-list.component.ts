import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList: User[] = [];
  first = 0;
  rows = 10;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userList = this.userService.getUsers();
  }

  /**************** PrimeNG DataTable Pagination ***********************/
  next() {
    this.first = this.first + this.rows;
  }
  prev() {
    this.first = this.first - this.rows;
  }
  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.userList
      ? this.first === this.userList.length - this.rows
      : true;
  }
  isFirstPage(): boolean {
    return this.userList ? this.first === 0 : true;
  }
  /***************************************************************/

  remove(id: number) {
    this.userService.removeUser(id);
    this.userList = this.userService.getUsers();
}
}
