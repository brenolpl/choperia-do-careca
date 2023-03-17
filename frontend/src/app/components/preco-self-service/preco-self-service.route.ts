import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {PrecoSelfServiceComponent} from "./preco-self-service.component";

const routes: Routes = [
    {
        path: 'preco-self-service',
        component: PrecoSelfServiceComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class PrecoSelfServiceRoute {
}
