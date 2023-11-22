import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { NgForm, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})


export class ManageProductsComponent implements OnInit {
  
  //variaveis de comportamento
  hideElement: boolean = false;
  showClientRegistration: boolean = false;

  //variaveis API
  product = {} as Product;
  products: Product[] = [];
  content: any;

  //variaveis de pesquisa
  @Input() width: string = '200px';
  @Input() height: string = '30px';
  searchTerm: string = '';
  result = {} as Product;
  searchResults: Product[] = [];
  searchActive: boolean = false;
  showSearchTable: boolean = true;
  hideTable: boolean = false
  


  constructor(private productService: ProductService){}

  ngOnInit() {
    this.getProduct();
  }


    //pesquisa por produtos
    search(): any {
      this.searchResults = this.products.filter(item => {
        const searchTerm = this.searchTerm.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchTerm) ||// Verificar o nome
          item.id.toString().includes(searchTerm) ||  // Verificar o Id (convertido para string)
          item.price.toString().includes(searchTerm) ||// verificar o preço (convertido para string)
          item.amount.toString().includes(searchTerm)  // Verificar a quantidade (convertido para string)
        );
      });
    
      this.showSearchTable = false;
      this.hideTable = true;
      this.searchActive = this.searchTerm !== '';
  
      if(this.searchActive === false){
        this.showSearchTable = true;
        this.hideTable = false;
      }
    }

  //formulario para criação de novo produto
  saveProduct(form: NgForm){
    if(this.product.id !== undefined) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.productService.saveProduct(this.product).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  //Obter todos os produtos do Banco de dados
  getProduct(){
    this.productService.getProduct().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  //deleta produto
  deleteProduct(product: Product){
    this.productService.deleteProduct(product).subscribe(() => {
      this.getProduct();
    });
  }

  //edita produto do inventario
  editProduct(product: Product){
    this.product = {...product}
  }


  //limpar formulario
  cleanForm(form: NgForm){
    this.getProduct();
    form.resetForm();
    this.product = {} as Product;
  }  
}
