import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private router: Router) { 
  }
  redirect(value: string){
    this.router.navigate([value]);
  }
}
