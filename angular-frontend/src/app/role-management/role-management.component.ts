import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/localStorage-service';
import { AppService } from '../../services/app-service';
import { Role, User } from '../../model/Interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [LocalStorageService, AppService],
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.css'
})
export class RoleManagementComponent {
  loggedUser?: User;
  roleList: Role[] = [];
  filteredRole: Role[] = [];
  token: string = "";

  //TODO aggiungere form per modale e funzioni di salvataggio

  constructor(private storage: LocalStorageService,
    private router: Router,
    private appService: AppService){}

  ngOnInit(){
    this.token = this.storage.get("token") || "";
    this.loggedUser = this.storage.get("userLogged");
    if(this.loggedUser == undefined){
      this.router.navigate(["/login"]);
    }
    //TODO controllo sul ruolo di login
    // se non autorizzato this.router.navigate(["/home"]);
    this.getRoles()
  }

  async getRoles(){
    this.roleList = await this.appService.getRoles(this.token);
    this.filteredRole = this.roleList;
  }
  
  deleteRole(id: any){
// TODO implementare funzione
  }
}


