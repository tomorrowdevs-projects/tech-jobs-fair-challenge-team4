import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

   login(username: string, password: string) {
    const url = "http://localhost:3000/auth/login";
    const body = { email: username, password: password };

    return this.http.post(url, body).toPromise()
      .then(async (response: any) => {
        return await response;
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error);
        throw error;
      });
  }
}
