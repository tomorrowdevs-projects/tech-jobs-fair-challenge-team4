import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../../services/app-service.js';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionUser, User } from '../../model/Interface';
import { LocalStorageService } from '../../services/localStorage-service.js';

interface CurrUser{
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [AppService, LocalStorageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  currentUser: CurrUser = {"username":"", "password":""};
  loggedUser?: SessionUser;

  constructor(private service: AppService,
    private router: Router,
    private storage: LocalStorageService) {
    this.loggedUser = storage.get("userLogged");
  }

  ngOnInit(){
    if(this.loggedUser != undefined){
      this.router.navigate(["/home"]);
    }
  }

  public login(){
    this.service.login(this.currentUser.username, this.currentUser.password).then((response) => {
      if(response.accessToken != undefined){

        this.loggedUser = {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          roleId: response.user.roleId,
          roleManagement: response.user.roleManager,
          userManagement: response.user.userManager,
          contactManagement: response.user.contactManager,
          deleting: response.user.canDelete,
          writing: response.user.canWrite,
          editing: response.user.canUpdate,
          reading: response.user.Canread
        };

        this.storage.set("userLogged", this.loggedUser);
        this.storage.set("token", response.accessToken);
        this.router.navigate(["/home"]);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
