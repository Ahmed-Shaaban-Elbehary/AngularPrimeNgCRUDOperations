import { Injectable } from '@angular/core';
import { User } from '../model/user';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/user';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getUsersByID(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient
      .get<User>(url)
      .pipe(catchError(this.handleError));
  }

  addUser(user: User): Observable<User> {
    return this.httpClient
      .post<User>(this.baseUrl, user)
      .pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user.id}`
    return this.httpClient
      .put<User>(url, user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  removeUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient
      .delete<User>(url)
      .pipe(catchError(this.handleError));
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(() => error);
  }
}
