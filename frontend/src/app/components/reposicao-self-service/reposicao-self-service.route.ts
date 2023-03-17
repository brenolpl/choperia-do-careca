import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {ReposicaoSelfServiceComponent} from "./reposicao-self-service.component";

const routes: Routes = [
    {
        path: 'reposicao-self-service',
        component: ReposicaoSelfServiceComponent,
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class ReposicaoSelfServiceRoute {
}
