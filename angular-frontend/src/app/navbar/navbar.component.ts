import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule],
  providers: [LocalStorageService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private storageService: LocalStorageService) { 
  }

  logout(): void {
    this.storageService.clean('userLogged');
    this.redirect('/login');
  }

  redirect(value: string){
    this.router.navigate([value]);
  }
}