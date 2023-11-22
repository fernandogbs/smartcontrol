import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Employer } from '../models/employer';

@Injectable({
  providedIn: 'root'
})

export class EmployerService {

  url = 'http://localhost:3000/employers';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getEmployer(): Observable<Employer[]>{
    return this.httpClient.get<Employer[]>(this.url)
    .pipe(retry(2),
      catchError(this.handleError)
    );
  }

  getEmployerById(id: number): Observable<Employer>{
    return this.httpClient.get<Employer>(this.url + '/' + id)
    .pipe(retry(2), 
      catchError(this.handleError)
      );
  }

  saveEmployer(employer: Employer): Observable<Employer>{
    return this.httpClient.post<Employer>(this.url, JSON.stringify(employer), this.httpOptions)
    .pipe(retry(2), 
      catchError(this.handleError)
      );
  }

  updateEmployer(employer: Employer): Observable<Employer>{
    return this.httpClient.put<Employer>(this.url + '/' + employer.id, JSON.stringify(employer), this.httpOptions)
    .pipe(retry(2), 
      catchError(this.handleError)
      );
  }

  deleteEmployer(employer: Employer): Observable<Employer>{
    return this.httpClient.delete<Employer>(this.url + '/' + employer.id, this.httpOptions)
    .pipe(
      retry(1), 
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
