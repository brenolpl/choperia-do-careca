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
import {FuncionariosModule} from "./components/funcionarios/funcionarios.module";
import {ClientesModule} from "./components/clientes/clientes.module";
import {HttpClientModule} from "@angular/common/http";
import {HomeModule} from "./components/home/home.module";
import {FechamentoPedidoModule} from "./components/fechamento-pedido/fechamento-pedido.module";
import {ChopeModule} from "./components/chopes/chope.module";
import {CartaoRfidModule} from "./components/cartao-rfid/cartao-rfid.module";
import {PrecoSelfServiceModule} from "./components/preco-self-service/preco-self-service.module";
import {PratosSelfServiceModule} from "./components/pratos-self-service/pratos-self-service.module";
import {ReposicaoSelfServiceModule} from "./components/reposicao-self-service/reposicao-self-service.module";

@NgModule({
    declarations: [
        AppComponent,
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
        FechamentoPedidoModule,
        ChopeModule,
        CartaoRfidModule,
        PrecoSelfServiceModule,
        PratosSelfServiceModule,
        ReposicaoSelfServiceModule,

        // precisa estar depois dos outros modulos de rotas senao nao redireciona corretamente para home caso a rota nao exista
        AppRoutingModule,

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
