import { Component, OnInit, Input } from '@angular/core';
import { Employer } from 'src/app/models/employer';
import { EmployerService } from 'src/app/services/employer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-employers',
  templateUrl: './manage-employers.component.html',
  styleUrls: ['./manage-employers.component.css']
})
export class ManageEmployersComponent implements OnInit{

  //variaveis de comportamento
  hideElement: boolean = false;
  showClientRegistration: boolean = false;
  
  //variaveis API
  employer = {} as Employer;
  employers: Employer[] = [];


  //variaveis de pesquisa
  @Input() width: string = '200px';
  @Input() height: string = '30px';
  searchTerm: string = '';
  result = {} as Employer;
  searchResults: Employer[] = [];
  searchActive: boolean = false;
  showSearchTable: boolean = true;
  hideTable: boolean = false
    


  constructor(private employerService: EmployerService) {}
  
  ngOnInit() {
    this.getEmployer();
  }


  search(): any {
    this.searchResults = this.employers.filter(item => {
      const searchTerm = this.searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchTerm) ||// Verificar o nome
        item.id.toString().includes(searchTerm) || // Verificar o ID
        item.cpf.toString().includes(searchTerm) ||  // Verificar o CPF (convertido para string)
        item.phoneNumber.toString().includes(searchTerm) ||  // Verificar o telefone (convertido para string)
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
  saveEmployer(form: NgForm){
    if(this.employer.id !== undefined) {
      this.employerService.updateEmployer(this.employer).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.employerService.saveEmployer(this.employer).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  //Obter todos os clientes do Banco de dados
  getEmployer(){
    this.employerService.getEmployer().subscribe((employers: Employer[]) => {
      this.employers = employers;
    });
  }

  //deleta cliente
  deleteEmployer(employer: Employer){
    this.employerService.deleteEmployer(employer).subscribe(() => {
      this.getEmployer();
    });
  }

  //editar cliente da tabela
  editEmployer(employer: Employer){
    this.employer = {...employer}
  }

  //limpar formulario
  cleanForm(form: NgForm){
    this.getEmployer();
    form.resetForm();
    this.employer = {} as Employer;
  }  
}
