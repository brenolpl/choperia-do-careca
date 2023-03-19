import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrecoSelfServiceRoute} from "./preco-self-service.route";
import {PrecoSelfServiceComponent} from "./preco-self-service.component";
import {
    DxButtonModule,
    DxLoadPanelModule,
    DxNumberBoxModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";

@NgModule({
  declarations: [
      PrecoSelfServiceComponent
  ],
    imports: [
        PrecoSelfServiceRoute,
        CommonModule,
        DxLoadPanelModule,
        DxToolbarModule,
        DxButtonModule,
        DxNumberBoxModule
    ]
})
export class PrecoSelfServiceModule { }
