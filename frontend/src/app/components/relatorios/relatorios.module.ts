import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelatoriosRoute} from "./relatorios.route";
import {RelatoriosComponent} from "./relatorios.component";


@NgModule({
    declarations: [
        RelatoriosComponent
    ],
    imports: [
        CommonModule,
        RelatoriosRoute
    ],
    exports: []
})
export class RelatoriosModule {
}
