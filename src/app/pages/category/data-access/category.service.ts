import { inject, Injectable } from '@angular/core';
import { env } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = `${env.url}/category`

  http = inject(HttpClient)

  getCategories(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/getAll`)
  }

  save(category: any): Observable<any>{
    return this.http.post<any>(`${this.url}/save`, category)
  }

  update(category: any, id: number): Observable<any>{
    return this.http.put<any>(`${this.url}/update/${id}`, category)
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}/delete/${id}`)
  }

  totalCategories(): Observable<any>{
    return this.http.get<any>(`${this.url}/totalCategories`)
  }

}
