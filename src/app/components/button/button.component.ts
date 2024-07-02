import { Component, Input } from '@angular/core';

@Component({
  selector: 'Button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class ButtonComponent {
  @Input() text = "Text Of Button";

  constructor(){}
}
