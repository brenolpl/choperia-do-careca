import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {VerificarSaidaComponent} from "./verificar-saida.component";

const routes: Routes = [
    {
        path: 'verificar-saida',
        component: VerificarSaidaComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class VerificarSaidaRoute {
}
