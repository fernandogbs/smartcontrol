import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/modules/customers/customers.component';
import { ProductsComponent } from './components/modules/products/products.component';
import { RequestsComponent } from './components/modules/requests/requests.component';
import { EmployeesComponent } from './components/modules/employees/employees.component';
import { LoginComponent } from './components/modules/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent } from './components/modules/users/users.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'company', component: CustomersComponent},
  {path: 'product', component: ProductsComponent, canActivate: [AuthGuard]},
  {path: 'request', component: RequestsComponent},
  {path: 'corporation', component: EmployeesComponent},
  {path: 'control', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
