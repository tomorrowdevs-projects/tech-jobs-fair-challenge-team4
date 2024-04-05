import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage-service';
import { Router } from '@angular/router';
import { Contact, SessionUser, User } from '../../model/Interface';
import { AppService } from '../../services/app-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [LocalStorageService, AppService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loggedUser?: SessionUser;
  contactList: Contact[];
  filteredContacts: Contact[];
  token: string;
  contactForm: Contact;
  modalOn: boolean = false;
  searchBarText: string = "";
  detailContact: Contact;

  constructor(private storage: LocalStorageService,
    private router: Router,
    private appService: AppService){
      this.token = this.storage.get("token") || "";
      this.contactList = [];
      this.filteredContacts = [];

        this.contactForm = {
          firstName: '',
          lastName: '',
          title: '',
          phoneNumber: '',
          email: '',
          department: '',
          company: '',
          location: '',
          isExternal: false,
          notes: ''
        };
        this.detailContact = {
          firstName: '',
          lastName: '',
          title: '',
          phoneNumber: '',
          email: '',
          department: '',
          company: '',
          location: '',
          isExternal: false,
          notes: ''
        }
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
    this.filteredContacts = this.contactList;
    console.log(this.contactList);
  }

  insertContact(){
    this.appService.putContact(this.contactForm, this.token);
    this.closeModal();
  }

  openModal(){
    this.modalOn = true;
  }
  closeModal(){
    this.modalOn = false;
  }

  search(){
    if(this.searchBarText == null || this.searchBarText == undefined || this.searchBarText == "")
      this.filteredContacts = this.contactList;
    else
      this.filteredContacts = this.contactList.filter(contact =>
        contact.firstName.toLowerCase().includes(this.searchBarText.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(this.searchBarText.toLowerCase())
      );
  }

  detail(c: Contact){
    this.detailContact = c;
  }

  clearDetail(){
    this.detailContact = {
      firstName: '',
      lastName: '',
      title: '',
      phoneNumber: '',
      email: '',
      department: '',
      company: '',
      location: '',
      isExternal: false,
      notes: ''
    };
  }
}
