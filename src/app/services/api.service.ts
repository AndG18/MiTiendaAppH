import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.example.com';

  constructor(private http: HttpClient) { }


  login(email: string, password: string): Promise<any> {
    return of({ success: email === 'test@correo.com' && password === '123456' }).pipe(delay(1000)).toPromise();
  }

  getProducts(): Observable<any[]> {
    const products = [
      { id: 1, name: 'Producto 1', price: 10 },
      { id: 2, name: 'Producto 2', price: 20 },
      { id: 3, name: 'Producto 3', price: 30 }
    ];
    return of(products).pipe(delay(500));
  }
}
