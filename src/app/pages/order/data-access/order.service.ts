import { inject, Injectable } from '@angular/core';
import { env } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = `${env.url}/order`

  http = inject(HttpClient)

  save(order: any): Observable<any>{
    return this.http.post<any>(`${this.url}/save`, order)
  }

  totalOrders(): Observable<any>{
    return this.http.get<any>(`${this.url}/totalOrders`)
  }
}
