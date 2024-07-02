import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CustomersComponent } from '../components/modules/customers/customers.component';
import { ProductsComponent } from '../components/modules/products/products.component';
import { RequestsComponent } from '../components/modules/requests/requests.component';
import { EmployeesComponent } from '../components/modules/employees/employees.component';
import { StatesComponent } from '../components/elements/states/states.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentMethodsComponent } from '../components/elements/payment-methods/payment-methods.component';
import { SaveButtonComponent } from '../components/elements/save-button/save-button.component';
import { LoginComponent } from '../components/modules/login/login.component';
import { ButtonComponent } from '../components/elements/button/button.component';
import { UsersComponent } from '../components/modules/users/users.component';
import { SearchbarComponent } from '../components/elements/searchbar/searchbar.component';
@NgModule({
   declarations: [
      CustomersComponent, 
      ProductsComponent, 
      RequestsComponent, 
      EmployeesComponent,
      StatesComponent,
      PaymentMethodsComponent,
      SaveButtonComponent,
      LoginComponent,
      ButtonComponent,
      SearchbarComponent,
      UsersComponent
      ],
   imports: [
      CommonModule, 
      HttpClientModule, 
      FormsModule,
      NoopAnimationsModule,
      ],
   exports: [
      CustomersComponent, 
      ProductsComponent, 
      RequestsComponent, 
      EmployeesComponent,
      StatesComponent,
      PaymentMethodsComponent,
      SaveButtonComponent,
      LoginComponent,
      ButtonComponent,
      SearchbarComponent,
      UsersComponent
   ],
   providers: [],
})

export class SharedModule {}