import { inject, Injectable } from '@angular/core';
import { env } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SustiService {
  url = `${env.url}/susti`;

  http = inject(HttpClient);

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/getAll`);
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/save`, data);
  }

  update(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.url}/update/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`);
  }
}
