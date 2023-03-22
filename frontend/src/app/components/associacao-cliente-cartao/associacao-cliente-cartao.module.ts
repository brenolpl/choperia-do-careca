import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssociacaoClienteCartaoRoute} from "./associacao-cliente-cartao.route";
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxNumberBoxModule, DxSelectBoxModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";
import {AssociacaoClienteCartaoComponent} from "./associacao-cliente-cartao.component";
import { AssociacaoClienteCartaoFormComponent } from './associacao-cliente-cartao-form/associacao-cliente-cartao-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FormFechamentoPedidoComponent} from "./form-fechamento-pedido/form-fechamento-pedido.component";
import { HistoricoComponent } from './historico/historico.component';


@NgModule({
    declarations: [
        AssociacaoClienteCartaoComponent,
        AssociacaoClienteCartaoFormComponent,
        FormFechamentoPedidoComponent,
        HistoricoComponent
  ],
    imports: [
        CommonModule,
        AssociacaoClienteCartaoRoute,
        DxTextBoxModule,
        DxButtonModule,
        DxDataGridModule,
        DxToolbarModule,
        DxFormModule,
        DxNumberBoxModule,
        ReactiveFormsModule
    ],
    exports: []
})
export class AssociacaoClienteCartaoModule {
}
