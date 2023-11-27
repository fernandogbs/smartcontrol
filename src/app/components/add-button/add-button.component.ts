import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent {
  @Input() text: string = 'Add'
  @Input() sizeButton: string = ''
  @Input() height: string = ''
}
