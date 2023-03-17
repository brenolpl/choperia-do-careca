import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PratosSelfServiceRoute} from "./pratos-self-service.route";
import {
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxLoadPanelModule,
    DxTextBoxModule,
    DxToolbarModule
} from "devextreme-angular";
import {DxiItemModule, DxoFormItemModule} from "devextreme-angular/ui/nested";
import {PratosSelfServiceComponent} from "./pratos-self-service.component";
import {FormPratosSelfServiceComponent} from "./form-pratos-self-service/form-pratos-self-service.component";


@NgModule({
    declarations: [
        PratosSelfServiceComponent,
        FormPratosSelfServiceComponent
    ],
    imports: [
        PratosSelfServiceRoute,
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
export class PratosSelfServiceModule {
}
