import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  url = `${env.url}/order`

  http = inject(HttpClient)

  getAll(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/getAll`)
  }

}
