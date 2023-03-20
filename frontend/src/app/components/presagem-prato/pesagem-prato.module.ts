import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PesagemPratoRoute} from "./pesagem-prato.route";
import {PesagemPratoComponent} from "./pesagem-prato.component";
import {
    DxButtonModule,
    DxLoadPanelModule,
    DxNumberBoxModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";

@NgModule({
  declarations: [
      PesagemPratoComponent
  ],
    imports: [
        PesagemPratoRoute,
        CommonModule,
        DxLoadPanelModule,
        DxToolbarModule,
        DxButtonModule,
        DxNumberBoxModule
    ]
})
export class PesagemPratoModule { }
