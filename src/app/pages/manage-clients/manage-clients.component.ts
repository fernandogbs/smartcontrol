import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/models/client';


@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css'],
})

export class ManageClientsComponent implements OnInit {
  
  //variaveis de comportamento
  hideElement: boolean = false;
  showClientRegistration: boolean = false;
  
  //variaveis API
  client = {} as Client;
  clients: Client[] = [];

  //variaveis de pesquisa
  @Input() width: string = '200px';
  @Input() height: string = '30px';
  searchTerm: string = '';
  result = {} as Client;
  searchResults: Client[] = [];
  searchActive: boolean = false;
  showSearchTable: boolean = true;
  hideTable: boolean = false
  
  


  constructor(private clientService: ClientService) {
 
  }
  
  ngOnInit() {
    this.getClient();
  }

  //pesquisa por clientes
  search(): any {
    this.searchResults = this.clients.filter(item => {
      const searchTerm = this.searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchTerm) ||// Verificar o nome
        item.cpf.toString().includes(searchTerm) ||  // Verificar o CPF (convertido para string)
        item.cnpj.toString().includes(searchTerm) ||// verificar se tem cnpj
        item.phoneNumber.toString().includes(searchTerm) ||  // Verificar o telefone (convertido para string)
        item.corporateReason.toLowerCase().includes(searchTerm) || // Verificar a razão social
        item.mailAddress.toLowerCase().includes(searchTerm) // Verificar o endereço de e-mail
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

  //formulario para criação de novo cliente
  saveClient(form: NgForm){
    if(this.client.id !== undefined) {
      this.clientService.updateClient(this.client).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.clientService.saveClient(this.client).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  //Obter todos os clientes do Banco de dados
  getClient(){
    this.clientService.getClient().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

  //deleta cliente
  deleteClient(client: Client){
    this.clientService.deleteClient(client).subscribe(() => {
      this.getClient();
    });
  }

  //editar cliente da tabela
  editClient(client: Client){
    this.client = {...client}
    this.result = {... client};
  }


  //limpar formulario
  cleanForm(form: NgForm){
    this.getClient();
    form.resetForm();
    this.client = {} as Client;
  }  
}
