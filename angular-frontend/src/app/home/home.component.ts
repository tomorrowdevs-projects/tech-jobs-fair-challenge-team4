import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage-service';
import { Router } from '@angular/router';
import { Contact, User } from '../../model/Interface';
import { AppService } from '../../services/app-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  providers: [LocalStorageService, AppService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loggedUser?: User;
  contactList: Contact[];
  token: string;

  constructor(private storage: LocalStorageService,
    private router: Router,
    private appService: AppService){
      this.token = this.storage.get("token") || "";
      this.contactList = [];
    }
  
  ngOnInit(){
    this.loggedUser = this.storage.get("userLogged");
    if(this.loggedUser == undefined){
      this.router.navigate(["/login"]);
    }
    this.getContacts();
  }
  
  async getContacts(){
    this.contactList = await this.appService.getContact(this.token);
    console.log(this.contactList);
  }
}
