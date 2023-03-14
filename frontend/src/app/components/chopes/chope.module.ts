import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChopeComponent} from './chope.component';
import {ChopeRoute} from "./chope.route";
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxNumberBoxModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";
import {FormChopeComponent} from "./form-chope/form-chope.component";
import {InserirChopeEstoqueComponent} from "./inserir-chope-estoque/inserir-chope-estoque.component";


@NgModule({
    declarations: [
        ChopeComponent,
        FormChopeComponent,
        InserirChopeEstoqueComponent
    ],
    imports: [
        CommonModule,
        ChopeRoute,
        DxTextBoxModule,
        DxButtonModule,
        DxDataGridModule,
        DxToolbarModule,
        DxFormModule,
        DxNumberBoxModule
    ],
    exports: []
})
export class ChopeModule {
}
