import { Injectable } from "@angular/core";
import { HttpService } from "./http-service.service";
import { response } from "express";
import { Contact } from "../model/Interface";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpService: HttpService) { }

   login(username: string, password: string) {
    const url = "http://localhost:3000/auth/login";
    const body = { email: username, password: password };

    return this.httpService.post(url, body);
  }

  async getContact(token: string){
    const url = "http://localhost:3000/contacts";
    const contact: Contact[] = await this.httpService.get<Contact[]>(url, token);
    return contact;    
  }
}
