import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {FuncionariosComponent} from "./funcionarios.component";
import {FormFuncionariosComponent} from "./form-funcionarios/form-funcionarios.component";

const routes: Routes = [
    {
        path: 'usuarios',
        component: FuncionariosComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'usuarios/novo',
        component: FormFuncionariosComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'usuarios/:id',
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
