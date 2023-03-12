import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProdutosComponent} from './produtos.component';
import {ProdutosRoute} from "./produtos.route";
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxNumberBoxModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";
import {FormProdutoComponent} from "./form-produto/form-produto.component";
import {ImpressaoCodigoBarrasComponent} from "./impressao-codigo-barras/impressao-codigo-barras.component";


@NgModule({
    declarations: [
        ProdutosComponent,
        FormProdutoComponent,
        ImpressaoCodigoBarrasComponent
    ],
    imports: [
        CommonModule,
        ProdutosRoute,
        DxTextBoxModule,
        DxButtonModule,
        DxDataGridModule,
        DxToolbarModule,
        DxFormModule,
        DxNumberBoxModule
    ],
    exports: []
})
export class ProdutosModule {
}
