import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelatoriosRoute} from "./relatorios.route";
import {RelatoriosComponent} from "./relatorios.component";
import {DxButtonModule, DxDataGridModule, DxDateBoxModule, DxToolbarModule} from "devextreme-angular";
import {RelatorioSaldoProdutosEstoque} from "./relatorio-saldo-produtos-estoque/relatorio-saldo-produtos-estoque";
import {
    RelatorioProdutosEstoqueMaiorZero
} from "./relatorio-produtos-estoque-maior-zero/relatorio-produtos-estoque-maior-zero";
import {RelatorioChopesMaisConsumidos} from "./relatorio-chopes-mais-consumidos/relatorio-chopes-mais-consumidos";
import {ComprasClientes} from "./compras-clientes/compras-clientes";
import {RelatorioReceitaDespesasComponent} from "./relatorio-receita-despesas/relatorio-receita-despesas-component";


@NgModule({
    declarations: [
        RelatoriosComponent,
        RelatorioSaldoProdutosEstoque,
        RelatorioProdutosEstoqueMaiorZero,
        RelatorioChopesMaisConsumidos,
        ComprasClientes,
        RelatorioReceitaDespesasComponent
    ],
    imports: [
        CommonModule,
        RelatoriosRoute,
        DxButtonModule,
        DxDataGridModule,
        DxToolbarModule,
        DxDateBoxModule
    ],
    exports: []
})
export class RelatoriosModule {
}
