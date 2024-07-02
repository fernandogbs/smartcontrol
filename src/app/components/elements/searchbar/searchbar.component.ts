import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'Searchbar-element',
  template: `<input id="inputArea" class="form-control shadow bg-body-tertiary rounded" width="200" height="30" placeholder={{placeholder}}>`,
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  placeholder?: string;
  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    this.definePlaceholderByRouter();
  }

  definePlaceholderByRouter() {
    const url = this.router.url;

    switch (url) {
      case '/corporation':
        this.placeholder = 'Pesquisar por funcionários...';
        break;
      case '/company':
        this.placeholder = 'Pesquisar por clientes...';
        break;
      case '/product':
        this.placeholder = 'Pesquisar por produtos...';
        break;
      case '/request':
        this.placeholder = 'Pesquisar por pedidos...';
        break;
      case '/control':
        this.placeholder = 'Pesquisar por usuarios...';
        break;
      default:
        this.placeholder = 'Pesquisar...';
        break;
    }
  }
}
