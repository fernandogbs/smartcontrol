import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  
  private url = 'http://localhost:3000/requests';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  getRequest(): Observable<Request[]>{
    return this.httpClient.get<Request[]>(this.url)
    .pipe(retry(2), 
      catchError(this.handleError)
      );
  }

  getRequestById(id: number): Observable<Request>{
    return this.httpClient.get<Request>(this.url + '/' + id).pipe(retry(2), catchError(this.handleError))
  }

  saveRequest(request: Request): Observable<Request> {
    return this.httpClient.post<Request>(this.url, JSON.stringify(request), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateRequest(request: Request): Observable<Request>{
    return this.httpClient.put<Request>(this.url + '/' + request.id, JSON.stringify(request), this.httpOptions)
    .pipe(
      retry(1), 
      catchError(this.handleError)
    );
  }  

  deleteRequest(request: Request): Observable<Request>{
    return this.httpClient.delete<Request>(this.url + '/' + request.id, this.httpOptions)
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
