import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {PratosSelfServiceComponent} from "./pratos-self-service.component";
import {FormPratosSelfServiceComponent} from "./form-pratos-self-service/form-pratos-self-service.component";

const routes: Routes = [
    {
        path: 'pratos',
        component: PratosSelfServiceComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'pratos/novo',
        component: FormPratosSelfServiceComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'pratos/:id',
        component: FormPratosSelfServiceComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class PratosSelfServiceRoute {
}
