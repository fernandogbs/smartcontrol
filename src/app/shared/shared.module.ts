import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { ManageClientsComponent } from '../pages/manage-clients/manage-clients.component';
import { ManageProductsComponent } from '../pages/manage-products/manage-products.component';
import { ManageRequestsComponent } from '../pages/manage-requests/manage-requests.component';
import { ManageEmployersComponent } from '../pages/manage-employers/manage-employers.component';
import { StatesComponent } from '../components/states/states.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentMethodsComponent } from '../components/payment-methods/payment-methods.component';
import { SaveButtonComponent } from '../components/save-button/save-button.component';
import { AddButtonComponent } from '../components/add-button/add-button.component';

import { LoginComponent } from '../pages/login/login.component';
import { LoginHeaderComponent } from '../components/login-header/login-header.component';
import { LoginLabelComponent } from '../components/login-label/login-label.component';
import { LoginButtonComponent } from '../components/login-button/login-button.component';
@NgModule({

   declarations: [
      ManageClientsComponent, 
      ManageProductsComponent, 
      ManageRequestsComponent, 
      ManageEmployersComponent,
      StatesComponent,
      PaymentMethodsComponent,
      SaveButtonComponent,
      AddButtonComponent,
      LoginComponent,
      LoginHeaderComponent,
      LoginLabelComponent,
      LoginButtonComponent,
      ],
   imports: [
      CommonModule, 
      HttpClientModule, 
      FormsModule,
      NoopAnimationsModule,

      ],
   exports: [
      ManageClientsComponent, 
      ManageProductsComponent, 
      ManageRequestsComponent, 
      ManageEmployersComponent,
      StatesComponent,
      SaveButtonComponent,
      PaymentMethodsComponent,
      AddButtonComponent,
      LoginComponent,
      LoginHeaderComponent,
      LoginLabelComponent,
      LoginButtonComponent,
   ],
   providers: [],

})

export class SharedModule {}