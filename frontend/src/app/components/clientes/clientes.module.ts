import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormClienteComponent} from './form-cliente/form-cliente.component';
import {ClientesRoute} from "./clientes.route";
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxLoadPanelModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";
import {DxiItemModule, DxoFormItemModule} from "devextreme-angular/ui/nested";
import {ClientesComponent} from "./clientes.component";


@NgModule({
    declarations: [
        ClientesComponent,
        FormClienteComponent
    ],
    imports: [
        ClientesRoute,
        CommonModule,
        DxToolbarModule,
        DxButtonModule,
        DxiItemModule,
        DxFormModule,
        DxoFormItemModule,
        DxTextBoxModule,
        DxDataGridModule,
        DxLoadPanelModule,
    ]
})
export class ClientesModule {
}
