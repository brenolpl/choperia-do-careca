import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FechamentoPedidoRoute} from "./fechamento-pedido.route";
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxNumberBoxModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";
import {
    DxiButtonModule,
    DxiColumnModule,
    DxiItemModule,
    DxiToolbarItemModule,
    DxoFormItemModule
} from "devextreme-angular/ui/nested";
import {FormFechamentoPedidoComponent} from "./form-fechamento-pedido/form-fechamento-pedido.component";
import {FechamentoPedidoComponent} from "./fechamento-pedido.component";


@NgModule({
    declarations: [
        FormFechamentoPedidoComponent,
        FechamentoPedidoComponent
    ],
    imports: [
        FechamentoPedidoRoute,
        CommonModule,
        DxTextBoxModule,
        DxDataGridModule,
        DxToolbarModule,
        DxButtonModule,
        DxiColumnModule,
        DxiButtonModule,
        DxiItemModule,
        DxFormModule,
        DxoFormItemModule,
        DxNumberBoxModule,
        DxiToolbarItemModule
    ]
})
export class FechamentoPedidoModule {
}
