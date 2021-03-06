import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUserUrl = 'http://localhost:8888/Laravel/cardmarket/public/api/users/signup';
  private loginUserUrl = 'http://localhost:8888/Laravel/cardmarket/public/api/users/login';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  /** POST: add a new user to the server */
  registerUser(user:User): Observable<User> {
    return this.http.post<User>(this.registerUserUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added user w/ username=${newUser.username}`)),
      catchError(this.handleError<User>('registerUser'))
    );
  }

  /** POST: add a new user to the server */
  loginUser(username:string, password:string): Observable<any> {

    return this.http.post(this.loginUserUrl, {username, password}, this.httpOptions).pipe(
      tap(_ => this.log(`login username=${username}`)),
      catchError(this.handleError<any>('loginUser'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}

