import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Form, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user: User = {} as User;
  users: User[] = [];
  loginForm: FormGroup;
  loginError: boolean = false;
  username: string = '';
  password: string = '';

  //construtor do componente
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getUser();
  }


  //obtem os usuários cadastrados no banco de dados
  getUser(): void {
    this.authService.getUser().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  //permite ver a senha
  hidePassword: boolean = true;
  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }


  //verifica se o usuário existe
  onLogin() {
    this.authService.login(this.username, this.password).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/product']);
      } else {
        this.loginError = true;
      }
    });
  }
}