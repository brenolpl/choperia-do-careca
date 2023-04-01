import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {RelatoriosComponent} from "./relatorios.component";

const routes: Routes = [
    {
        path: 'relatorios',
        component: RelatoriosComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class RelatoriosRoute {
}
