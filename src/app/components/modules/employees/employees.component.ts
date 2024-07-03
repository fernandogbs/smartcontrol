import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit{

  //variaveis de comportamento
  hideElement: boolean = false;
  showClientRegistration: boolean = false;
  
  //variaveis API
  employee = {} as Employee;
  employees: Employee[] = [];


  //variaveis de pesquisa
  @Input() width: string = '200px';
  @Input() height: string = '30px';
  searchTerm: string = '';
  result = {} as Employee;
  searchResults: Employee[] = [];
  searchActive: boolean = false;
  showSearchTable: boolean = true;
  hideTable: boolean = false

  constructor(private employeeService: EmployeeService) {}
  
  ngOnInit() {
    this.getEmployee();
  }


  search(): any {
    this.searchResults = this.employees.filter(item => {
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
  saveEmployee(form: NgForm){
    if(this.employee.id !== undefined) {
      this.employeeService.updateEmployee(this.employee).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.employeeService.saveEmployee(this.employee).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  //Obter todos os clientes do Banco de dados
  getEmployee(){
    this.employeeService.getEmployee().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }

  //deleta cliente
  deleteEmployee(employer: Employee){
    this.employeeService.deleteEmployee(employer).subscribe(() => {
      this.getEmployee();
    });
  }

  //editar cliente da tabela
  editEmployee(employee: Employee){
    this.employee = {...employee}
  }

  //limpar formulario
  cleanForm(form: NgForm){
    this.getEmployee();
    form.resetForm();
    this.employee = {} as Employee;
  }  
}
