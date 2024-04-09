import { Injectable } from "@angular/core";
import { HttpService } from "./http-service.service";
import { response } from "express";
import { Contact, Role, SessionUser, User } from "../model/Interface";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private httpService: HttpService) {
   }

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

  async getRoles(token: string){
    const url = "http://localhost:3000/roles";
    const roles: Role[] = await this.httpService.get<Role[]>(url, token);
    return roles;
  }

  async getUsers(token: string){
    const url = "http://localhost:3000/users";
    const roles: User[] = await this.httpService.get<User[]>(url, token);
    return roles;
  }

  async deleteUser(id: number, token: string){
    const url = "http://localhost:3000/users/" + id;
    const user: User = await this.httpService.delete<User>(url, token);
    return user;
  }

  async deleteRole(id: number, token: string){
    const url = "http://localhost:3000/users/" + id;
    const role: Role = await this.httpService.delete<Role>(url, token);
    return role;
  }

  putContact(contact: Contact, token: string){
    const url = "http://localhost:3000/contacts";
    this.httpService.post(url, contact, token);
  }
}
