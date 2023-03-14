import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuncionariosRoute} from "./funcionarios.route";
import {FuncionariosComponent} from "./funcionarios.component";
import {FormFuncionariosComponent} from "./form-funcionarios/form-funcionarios.component";
import {DxButtonModule, DxDataGridModule, DxFormModule, DxTextBoxModule, DxToolbarModule} from "devextreme-angular";

@NgModule({
    declarations: [
        FuncionariosComponent,
        FormFuncionariosComponent
    ],
    imports: [
        FuncionariosRoute,
        CommonModule,
        DxToolbarModule,
        DxButtonModule,
        DxFormModule,
        DxTextBoxModule,
        DxDataGridModule
    ]
})
export class FuncionariosModule {
}
