import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private url = 'http://localhost:3000/employees';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getEmployee(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(this.url)
    .pipe(retry(2),
      catchError(this.handleError)
    );
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(this.url + '/' + id)
    .pipe(retry(2), 
      catchError(this.handleError)
      );
  }

  saveEmployee(Employee: Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(this.url, JSON.stringify(Employee), this.httpOptions)
    .pipe(retry(2), 
      catchError(this.handleError)
      );
  }

  updateEmployee(Employee: Employee): Observable<Employee>{
    return this.httpClient.put<Employee>(this.url + '/' + Employee.id, JSON.stringify(Employee), this.httpOptions)
    .pipe(retry(2), 
      catchError(this.handleError)
      );
  }

  deleteEmployee(Employee: Employee): Observable<Employee>{
    return this.httpClient.delete<Employee>(this.url + '/' + Employee.id, this.httpOptions)
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
