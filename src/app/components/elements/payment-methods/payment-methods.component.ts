import { Component, OnInit, Input } from '@angular/core';
import { Request } from 'src/app/models/request';
import { RequestService } from 'src/app/services/request.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit{
  paymentMethod: any[] = [
    { id: 1, nome: 'Cartão de Crédito' },
    { id: 2, nome: 'Cartão de Débito' },
    { id: 3, nome: 'Dinheiro' },
    { id: 4, nome: 'Transferência Bancária' },
    { id: 5, nome: 'Boleto Bancário' },
    // Adicione outras formas de pagamento aqui
  ];

  request = {} as Request;
  requests: Request[] = [];
  content: any;

  //variaveis de comportamento
  hideElement: boolean = false;
  showClientRegistration: boolean = false;

  //variaveis de pesquisa
  @Input() width: string = '200px';
  @Input() height: string = '30px';
  searchTerm: string = '';
  result = {} as Request;
  searchResults: Request[] = [];
  searchActive: boolean = false;
  showSearchTable: boolean = true;
  hideTable: boolean = false
  

  constructor(private requestService: RequestService) {}
  
  ngOnInit() {
    this.getRequest();
  }


      //pesquisa por produtos
    search(): any {
      this.searchResults = this.requests.filter(item => {
        const searchTerm = this.searchTerm.toLowerCase();
        return (
          item.buyerName.toLowerCase().includes(searchTerm) ||// Verificar o nome
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



  //formulario para criação de novo pedido
  saveRequest(form: NgForm){
    if(this.request.id !== undefined) {
      this.requestService.updateRequest(this.request).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.requestService.saveRequest(this.request).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  //Obter todos os pedidos do Banco de dados
  getRequest(){
    this.requestService.getRequest().subscribe((clients: Request[]) => {
      this.requests = clients;
    });
  }

  //deleta pedido
  deleteRequest(request: Request){
    this.requestService.deleteRequest(request).subscribe(() => {
      this.getRequest();
    });
  }

  //editar pedido da tabela
  editRequest(request: Request){
    this.request = {...request}
  }


  //limpar formulario
  cleanForm(form: NgForm){
    this.getRequest();
    form.resetForm();
    this.request = {} as Request;
  }  
}
