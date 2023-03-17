import {NgModule} from '@angular/core';
import {EstoqueCozinhaComponent} from "./estoque-cozinha.component";
import {DxButtonModule, DxDataGridModule, DxTextBoxModule, DxToolbarModule} from "devextreme-angular";
import {EstoqueCozinhaRoute} from "./estoque-cozinha.route";


@NgModule({
    declarations: [
        EstoqueCozinhaComponent
    ],
    imports: [
        EstoqueCozinhaRoute,
        DxToolbarModule,
        DxButtonModule,
        DxTextBoxModule,
        DxDataGridModule
    ],
    exports: []
})
export class EstoqueCozinhaModule {
}
