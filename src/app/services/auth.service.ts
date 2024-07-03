// auth.service.ts

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, retry, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  
  private url = 'http://localhost:3000/users';


  constructor(private httpClient: HttpClient, private router: Router) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Faz login se o usuário existir e a senha estiver correta
  login(username: string, password: string): Observable<boolean> {
    return new Observable((observer) => {
      if(username === "admin" && password === "admin") {
        this.isAuthenticated = true;
        observer.next(true);
      } else {
        this.getUser().subscribe((users: User[]) => {
          const user = users.find((u) => u.username === username && u.password == password);
          if (user) {
            this.isAuthenticated = true;
            observer.next(true);
          } else {
            observer.next(false);
          }
        });
      }
    });
  }

  getUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url)
    .pipe(retry(2),
      catchError(this.handleError)
    );
  }

  deleteUser(user: User): Observable<User>{
    return this.httpClient.delete<User>(this.url + '/' + user.id, this.httpOptions)
    .pipe(
      retry(1), 
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User>{
    return this.httpClient.put<User>(this.url + '/' + user.id, JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1), 
      catchError(this.handleError)
    );
  }

  addUser(user: User): Observable<User>{
    return this.httpClient.post<User>(this.url, JSON.stringify(user), this.httpOptions)
    .pipe(retry(2), 
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
