import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  pagesSubtitles: string[] = ["Realize seu login", "Recuperar senha", "Alterar sua senha"];
  phrases: string[] = [""];

}
