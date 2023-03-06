import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {FuncionariosComponent} from "./funcionarios.component";
import {FormFuncionariosComponent} from "./form-funcionarios/form-funcionarios.component";

const routes: Routes = [
    {
        path: 'funcionarios',
        component: FuncionariosComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'funcionarios/novo',
        component: FormFuncionariosComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'funcionarios/:id',
        component: FormFuncionariosComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class FuncionariosRoute {
}
