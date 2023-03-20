import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {PesagemPratoComponent} from "./pesagem-prato.component";

const routes: Routes = [
    {
        path: 'pesagem-prato',
        component: PesagemPratoComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class PesagemPratoRoute {
}
