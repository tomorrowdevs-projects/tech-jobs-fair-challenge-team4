import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage-service';
import { CommonModule } from '@angular/common';
import { SessionUser } from '../../model/Interface';
import { AppService } from '../../services/app-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  providers: [LocalStorageService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userLogged?: SessionUser;
  logged: boolean = false;

  constructor(
    private router: Router,
    private storageService: LocalStorageService,
    private appService: AppService) {
    }

  ngOnInit(){
    this.userLogged = this.storageService.get('userLogged');
    if(this.userLogged != undefined){
      this.logged = true;
    }
  }
  
  logout(): void {
    this.storageService.clean('userLogged');
    this.logged = false;
    this.redirect('/login');
  }

  redirect(value: string){
    this.router.navigate([value]);
  }
  
}