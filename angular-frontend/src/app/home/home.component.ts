import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage-service';
import { Router } from '@angular/router';
import { User } from '../../model/Interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers: [LocalStorageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loggedUser?: User;

  constructor(private storage: LocalStorageService,
    private router: Router){}
  
  ngOnInit(){
    this.loggedUser = this.storage.get("userLogged");
    if(this.loggedUser == undefined){
      this.router.navigate(["/login"]);
    }
  }

}
