import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VerificarSaidaRoute} from "./verificar-saida.route";
import {VerificarSaidaComponent} from "./verificar-saida.component";
import {
    DxButtonModule,
    DxLoadPanelModule,
    DxNumberBoxModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";

@NgModule({
  declarations: [
      VerificarSaidaComponent
  ],
    imports: [
        VerificarSaidaRoute,
        CommonModule,
        DxLoadPanelModule,
        DxToolbarModule,
        DxButtonModule,
        DxNumberBoxModule,
        DxTextBoxModule
    ]
})
export class VerificarSaidaModule { }
