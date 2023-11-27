import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent {
  @Input() email: string = "";
  @Input() password: string = "";


  constructor(){}


  //registro


  //autenticacao
  login(email: String, password: String) {

  }

}
