import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FocalLoansComponent } from './focal-loans/focal-loans.component';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { LoginComponent } from './login/login.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MyLoansComponent } from './my-loans/my-loans.component';
import { ProfileComponent } from './profile/profile.component';
import { RecoverComponent } from './recover/recover.component';
import { RoleManagementComponent } from './role-management/role-management.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'newloan', component: LoanFormComponent },
  { path: 'loan/:area', component: FocalLoansComponent },
  { path: 'home', component: MyLoansComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'manage', component: RoleManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
