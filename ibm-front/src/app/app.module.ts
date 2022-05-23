import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import axios from 'axios';


// carbon-components-angular default imports
import {
  UIShellModule,
  IconModule,
  IconService,
  ButtonModule,
  InputModule,
  StructuredListModule,
  TabsModule,
  SearchModule,
  CheckboxModule,
  RadioModule,
  GridModule,
  TagModule,
  ModalModule,
  DropdownModule 
} from 'carbon-components-angular';

import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { FocalLoansComponent } from './focal-loans/focal-loans.component';
import { MyLoansComponent } from './my-loans/my-loans.component';
import { ProfileComponent } from './profile/profile.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { PeripheralRegistrationComponent } from './peripheral-registration/peripheral-registration.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoverComponent,
    MenuBarComponent,
    LoanFormComponent,
    FocalLoansComponent,
    MyLoansComponent,
    ProfileComponent,
    RoleManagementComponent,
    PeripheralRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UIShellModule,
    IconModule,
    ButtonModule,
    InputModule,
    ReactiveFormsModule,
    StructuredListModule,
    TabsModule,
    SearchModule,
    Ng2SearchPipeModule,
    CheckboxModule,
    RadioModule,
    GridModule,
    TagModule,
    ModalModule,
    DropdownModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
