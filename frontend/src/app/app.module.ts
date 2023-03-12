import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SideNavInnerToolbarModule, SideNavOuterToolbarModule, SingleCardModule} from './layouts';
import {
    ChangePasswordFormModule,
    CreateAccountFormModule,
    FooterModule,
    LoginFormModule,
    ResetPasswordFormModule
} from './shared/components';
import {AppInfoService, AuthService, ScreenService} from './shared/services';
import {UnauthenticatedContentModule} from './unauthenticated-content';
import {AppRoutingModule} from './app-routing.module';
import {ProdutosModule} from "./components/produtos/produtos.module";
import {FuncionariosComponent} from './components/funcionarios/funcionarios.component';
import {FuncionariosModule} from "./components/funcionarios/funcionarios.module";
import {
    DevExtremeModule,
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxResponsiveBoxModule,
    DxTextBoxModule
} from "devextreme-angular";
import {FormFuncionariosComponent} from './components/funcionarios/form-funcionarios/form-funcionarios.component';
import {ClientesComponent} from './components/clientes/clientes.component';
import {ClientesModule} from "./components/clientes/clientes.module";
import {HttpClientModule} from "@angular/common/http";
import {HomeModule} from "./components/home/home.module";

@NgModule({
    declarations: [
        AppComponent,
        FuncionariosComponent,
        FormFuncionariosComponent,
        ClientesComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        SideNavOuterToolbarModule,
        SideNavInnerToolbarModule,
        SingleCardModule,
        FooterModule,
        ResetPasswordFormModule,
        CreateAccountFormModule,
        ChangePasswordFormModule,
        LoginFormModule,
        UnauthenticatedContentModule,
        ProdutosModule,
        FuncionariosModule,
        ClientesModule,
        HomeModule,

        // precisa estar depois dos outros modulos de rotas senao nao redireciona corretamente para home caso a rota nao exista
        AppRoutingModule,

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
export class AppModule {
}
