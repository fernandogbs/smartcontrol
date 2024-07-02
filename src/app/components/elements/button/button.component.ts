import { Component, Input } from '@angular/core';

@Component({
  selector: 'Button-element',
  template: `<button id="_button">{{text}}</button>`,
  styleUrls: ['./button.component.css']
})

export class ButtonComponent {
  @Input() text = "Text Of Button";

  constructor(){}
}
