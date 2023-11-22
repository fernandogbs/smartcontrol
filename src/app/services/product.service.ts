
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  getProduct(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url)
    .pipe(retry(2), 
      catchError(this.handleError)
      );
  }

  getProductById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(this.url + '/' + id).pipe(retry(2), catchError(this.handleError))
  }

  saveProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateProduct(product: Product): Observable<Product>{
    return this.httpClient.put<Product>(this.url + '/' + product.id, JSON.stringify(product), this.httpOptions)
    .pipe(
      retry(1), 
      catchError(this.handleError)
    );
  }  

  deleteProduct(product: Product): Observable<Product>{
    return this.httpClient.delete<Product>(this.url + '/' + product.id, this.httpOptions)
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
