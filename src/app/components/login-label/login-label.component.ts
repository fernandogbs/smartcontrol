import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-label',
  templateUrl: './login-label.component.html',
  styleUrls: ['./login-label.component.css']
})
export class LoginLabelComponent {
  @Input() placeHolder: string = "";
  @Input() type: string = "text";

  constructor() { }
}
