import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import {ProdutosModule} from "./components/produtos/produtos.module";
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {UsuariosModule} from "./components/usuarios/usuarios.module";
import {
  DevExtremeModule,
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
  DxResponsiveBoxModule,
  DxTextBoxModule
} from "devextreme-angular";
import { FormUsuariosComponent } from './components/usuarios/form-usuarios/form-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    FormUsuariosComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    ProdutosModule,
    UsuariosModule,
    DxDataGridModule,
    DxButtonModule,
    DxTextBoxModule,
    DxResponsiveBoxModule,
    DxFormModule,
    DevExtremeModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
