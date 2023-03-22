import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChopeComponent} from './chope.component';
import {ChopeRoute} from "./chope.route";
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxNumberBoxModule, DxProgressBarModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";
import {FormChopeComponent} from "./form-chope/form-chope.component";
import {InserirChopeEstoqueComponent} from "./inserir-chope-estoque/inserir-chope-estoque.component";
import { ConsumirChopeComponent } from './consumir-chope/consumir-chope.component';


@NgModule({
    declarations: [
        ChopeComponent,
        FormChopeComponent,
        InserirChopeEstoqueComponent,
        ConsumirChopeComponent
    ],
    imports: [
        CommonModule,
        ChopeRoute,
        DxTextBoxModule,
        DxButtonModule,
        DxDataGridModule,
        DxToolbarModule,
        DxFormModule,
        DxNumberBoxModule,
        DxProgressBarModule
    ],
    exports: []
})
export class ChopeModule {
}
