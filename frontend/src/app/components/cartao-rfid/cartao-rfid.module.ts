import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartaoRfidRoute} from "./cartao-rfid.route";
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxNumberBoxModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";
import { FormCartaoRfidComponent } from './form-cartao-rfid/form-cartao-rfid.component';
import {CartaoRfidComponent} from "./cartao-rfid.component";


@NgModule({
    declarations: [
        FormCartaoRfidComponent,
        CartaoRfidComponent
  ],
    imports: [
        CommonModule,
        CartaoRfidRoute,
        DxTextBoxModule,
        DxButtonModule,
        DxDataGridModule,
        DxToolbarModule,
        DxFormModule,
        DxNumberBoxModule
    ],
    exports: []
})
export class CartaoRfidModule {
}
