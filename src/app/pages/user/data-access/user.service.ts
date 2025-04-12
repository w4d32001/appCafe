import { inject, Injectable } from '@angular/core';
import { env } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${env.url}/user`

  http = inject(HttpClient)

  getUsers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/getAll`)
  }

  getUser(id: number): Observable<any>{
    return this.http.get<any>(`${this.url}/getOne/${id}`)
  }

  save(user: any): Observable<any>{
    return this.http.post<any>(`${this.url}/save`, user)
  }

  update(user: any, id: number): Observable<any>{
    return this.http.put<any>(`${this.url}/update/${id}`, user)
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}/delete/${id}`)
  }

  login(formData: FormData): Observable<any>{
    return this.http.post(`${this.url}/login`, formData, {
      responseType: 'text'
    })
  }

}
