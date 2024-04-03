import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../model/User';
import { AppService } from '../../services/AppService';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [AppService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  currentUser: User;

  constructor(private service: AppService,
    private router: Router) { 
    this.currentUser = new User;
  }

  public login(){
    console.log(`start login with parameters: ${this.currentUser.username} and ${this.currentUser.password}`)
    this.service.login(this.currentUser.username, this.currentUser.password).then((response) => {
      if(response.accessToken != undefined)
          this.router.navigate(["/home"]);
    }).catch((err) => {
      console.log(err);
    });
  }
}
