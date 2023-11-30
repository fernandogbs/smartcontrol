import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit{
  showAddUserForm: boolean = false;
  hideElement: boolean = false;
  showClientRegistration: boolean = false;
  hideTable: boolean = false
  hidePassword: boolean = true;
  users: User[] = [];
  user = {} as User;
  
  searchResults: User[] = [];
  searchActive: boolean = false;
  searchTerm: string = '';
  showSearchTable: boolean = true;

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
      this.getUsers();
  }


  search(): any {
    this.searchResults = this.users.filter(item => {
      const searchTerm = this.searchTerm.toLowerCase();
      return (
        item.username.toLowerCase().includes(searchTerm) ||// Verificar o nome
        item.id.toString().includes(searchTerm) ||  // Verificar o Id (convertido para string)
        item.email?.toString().includes(searchTerm) ||// verificar o preço (convertido para string)
        item.phone?.toString().includes(searchTerm)  // Verificar a quantidade (convertido para string)
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

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  getUsers() {
    this.authService.getUser().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  deleteUser(user: User) {
    this.authService.deleteUser(user).subscribe(() => {
      this.getUsers();
    });
  }
  
  addUser(form: NgForm) {
    if(this.user.id !== undefined){
      this.authService.updateUser(this.user).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.authService.addUser(this.user).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  editUser(user: User) {
    this.user = { ...user };
  }

  cleanForm(form: NgForm){
    this.getUsers();
    form.resetForm();
    this.user = {} as User;
  }  
}
