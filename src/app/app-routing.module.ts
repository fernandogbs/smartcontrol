import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageClientsComponent } from './pages/manage-clients/manage-clients.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { ManageRequestsComponent } from './pages/manage-requests/manage-requests.component';
import { ManageEmployersComponent } from './pages/manage-employers/manage-employers.component';



const routes: Routes = [
  {path: '', component: ManageProductsComponent},
  {path: 'company', component: ManageClientsComponent},
  {path: 'product', component: ManageProductsComponent},
  {path: 'request', component: ManageRequestsComponent},
  {path: 'corporation', component: ManageEmployersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
