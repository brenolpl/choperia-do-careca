import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReposicaoSelfServiceRoute} from "./reposicao-self-service.route";
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxLoadPanelModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";
import {DxiItemModule, DxoFormItemModule} from "devextreme-angular/ui/nested";
import {ReposicaoSelfServiceComponent} from "./reposicao-self-service.component";


@NgModule({
    declarations: [
        ReposicaoSelfServiceComponent
    ],
    imports: [
        ReposicaoSelfServiceRoute,
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
export class ReposicaoSelfServiceModule {
}
