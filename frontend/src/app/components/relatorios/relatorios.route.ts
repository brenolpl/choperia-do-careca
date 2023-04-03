import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {RelatoriosComponent} from "./relatorios.component";
import {RelatorioSaldoProdutosEstoque} from "./relatorio-saldo-produtos-estoque/relatorio-saldo-produtos-estoque";
import {
    RelatorioProdutosEstoqueMaiorZero
} from "./relatorio-produtos-estoque-maior-zero/relatorio-produtos-estoque-maior-zero";
import {RelatorioChopesMaisConsumidos} from "./relatorio-chopes-mais-consumidos/relatorio-chopes-mais-consumidos";
import {ComprasClientes} from "./compras-clientes/compras-clientes";
import {RelatorioReceitaDespesasComponent} from "./relatorio-receita-despesas/relatorio-receita-despesas-component";

const routes: Routes = [
    {
        path: 'relatorios',
        component: RelatoriosComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'relatorio-saldo-produtos-estoque',
        component: RelatorioSaldoProdutosEstoque,
        canActivate: [AuthGuardService]
    },
    {
        path: 'relatorio-saldo-produtos-estoque-maior-zero',
        component: RelatorioProdutosEstoqueMaiorZero,
        canActivate: [AuthGuardService]
    },
    {
        path: 'relatorio-chopes-mais-consumidos',
        component: RelatorioChopesMaisConsumidos,
        canActivate: [AuthGuardService]
    },
    {
        path: 'relatorio-compras-clientes',
        component: ComprasClientes,
        canActivate: [AuthGuardService]
    },
    {
        path: 'receita-despesa',
        component: RelatorioReceitaDespesasComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class RelatoriosRoute {
}
