import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/localStorage-service';
import { AppService } from '../../services/app-service';
import { Role, SessionUser, User } from '../../model/Interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [LocalStorageService, AppService],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  loggedUser?: SessionUser;
  userList: User[] = [];
  filteredUsers: User[] = [];
  token: string = "";

  constructor(private storage: LocalStorageService,
    private router: Router,
    private appService: AppService){}

  ngOnInit(){
    this.token = this.storage.get("token") || "";
    this.loggedUser = this.storage.get("userLogged");
    if(this.loggedUser == undefined){
      this.router.navigate(["/login"]);
    }

    if (this.loggedUser?.userManagement == false){
      this.router.navigate(["/home"]);
    }
    this.getUsers()
  }

  async getUsers(){
    this.userList = await this.appService.getUsers(this.token);
    this.filteredUsers = this.userList;
  }

  async saveUser(user: User){
    //TODO implementare funzione
  }

  async deleteUser(userId: any){
    const user = await this.appService.deleteUser(userId, this.token);
    this.userList.splice(this.userList.findIndex((u) => u.id == user.id), 1);
  }

}
