import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent {
  @Input() title: string = "Tenha controle da sua empresa";
  @Input() subtitle: string = "";
  @Input() description: string = "";
}
