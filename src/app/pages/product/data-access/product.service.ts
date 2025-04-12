import { inject, Injectable } from '@angular/core';
import { env } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
url = `${env.url}/product`

  http = inject(HttpClient)

  getProducts(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/getAll`)
  }

  getProduct(id: number): Observable<any>{
    return this.http.get<any>(`${this.url}/getOne/${id}`)
  }

  save(product: any): Observable<any>{
    return this.http.post<any>(`${this.url}/save`, product)
  }

  update(product: any, id: number): Observable<any>{
    return this.http.put<any>(`${this.url}/update/${id}`, product)
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}/delete/${id}`)
  }
}
