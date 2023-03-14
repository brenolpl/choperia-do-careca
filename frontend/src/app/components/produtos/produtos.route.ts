import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProdutosComponent} from "./produtos.component";
import {AuthGuardService} from "../../shared/services";
import {FormProdutoComponent} from "./form-produto/form-produto.component";
import {ImpressaoCodigoBarrasComponent} from "./impressao-codigo-barras/impressao-codigo-barras.component";
import {InserirProdutoEstoqueComponent} from "./inserir-produto-estoque/inserir-produto-estoque.component";

const routes: Routes = [
    {
        path: 'produtos',
        component: ProdutosComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'produtos/novo',
        component: FormProdutoComponent,
        canActivate: [ AuthGuardService ]
    },
    {
        path: 'produtos/imprimir-codigo',
        component: ImpressaoCodigoBarrasComponent,
        canActivate: [ AuthGuardService ]
    },
    {
        path: 'produtos/inserir-estoque',
        component: InserirProdutoEstoqueComponent,
        canActivate: [ AuthGuardService ]
    },
    {
        path: 'produtos/:id',
        component: FormProdutoComponent,
        canActivate: [ AuthGuardService ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class ProdutosRoute {
}
