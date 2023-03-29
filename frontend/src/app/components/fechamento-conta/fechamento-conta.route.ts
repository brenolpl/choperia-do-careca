import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {FechamentoContaComponent} from "./fechamento-conta.component";
import {FormFechamentoContaComponent} from "./form-fechamento-conta/form-fechamento-conta.component";

const routes: Routes = [
    {
        path: 'fechamento-conta',
        component: FechamentoContaComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'fechamento-conta/novo',
        component: FormFechamentoContaComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class FechamentoContaRoute {
}
