import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageClientsComponent } from './pages/manage-clients/manage-clients.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { ManageRequestsComponent } from './pages/manage-requests/manage-requests.component';
import { ManageEmployersComponent } from './pages/manage-employers/manage-employers.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'company', component: ManageClientsComponent},
  {path: 'product', component: ManageProductsComponent, canActivate: [AuthGuard]},
  {path: 'request', component: ManageRequestsComponent},
  {path: 'corporation', component: ManageEmployersComponent},
  {path: 'control', component: ManageUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
