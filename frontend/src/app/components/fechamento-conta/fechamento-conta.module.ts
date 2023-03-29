import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FechamentoContaRoute} from "./fechamento-conta.route";
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxLoadPanelModule, DxNumberBoxModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";
import {DxiItemModule, DxoFormItemModule} from "devextreme-angular/ui/nested";
import {FechamentoContaComponent} from "./fechamento-conta.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FormFechamentoContaComponent} from "./form-fechamento-conta/form-fechamento-conta.component";


@NgModule({
    declarations: [
        FechamentoContaComponent,
        FormFechamentoContaComponent
    ],
    imports: [
        FechamentoContaRoute,
        CommonModule,
        DxToolbarModule,
        DxButtonModule,
        DxiItemModule,
        DxFormModule,
        DxoFormItemModule,
        DxTextBoxModule,
        DxDataGridModule,
        DxLoadPanelModule,
        ReactiveFormsModule,
        DxNumberBoxModule,
    ]
})
export class FechamentoContaModule {
}
