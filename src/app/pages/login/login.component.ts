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

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.authService.getUser().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  hidePassword = true;

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/product']);
      } else {
        this.loginError = true;
      }
    });
  }
  // loginValid() {
  //   if (this.loginForm && this.loginForm.get('username') && this.loginForm.get('password')) {
  //     const username = this.loginForm.get('username')?.value;
  //     const password = this.loginForm.get('password')?.value;
  //     this.authService.login(username, password);
  //   }
  //   this.authService.login(this.user.username, this.user.password);
  //   if (this.authService.isAuthenticated) {
  //     this.router.navigate(['/product']);
  //   } else {
  //     alert('Usuário ou senha incorretos');
  //   }
  //   if(this.user.username === '' && this.user.password === '') {
  //     this.router.navigate(['/login']);
  //     alert('Usuário ou senha incorretossss');
  //   }
  // }
}