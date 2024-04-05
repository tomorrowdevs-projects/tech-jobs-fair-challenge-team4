import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Contact } from '../model/Interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(url: any, body: any, token?: any){
    const headers = this.getHeaders(token);
    return this.http.post(url, body, {headers}).toPromise()
    .then(async (response: any) => {
      return await response;
    })
    .catch(error => {
      console.error('Si è verificato un errore:', error);
      throw error;
    });
  }

  get<T>(url: any, token?: any){
    const headers = this.getHeaders(token);
    return this.http.get<any[]>(url, {headers}).toPromise()
    .then(async (response: any) => {
      return await response;
    })
    .catch(error => {
      console.error('Si è verificato un errore:', error);
      throw error;
    });
  }

  delete<T>(url: any, token?: any){
    const headers = this.getHeaders(token);
    return this.http.delete<any[]>(url, {headers}).toPromise()
    .then(async (response: any) => {
      return await response;
    })
    .catch(error => {
      console.error('Si è verificato un errore:', error);
      throw error;
    });
  }

  getHeaders(token?: string){
    if(token != undefined)
      return new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      });
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
  }
}
