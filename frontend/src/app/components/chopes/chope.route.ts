import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChopeComponent} from "./chope.component";
import {AuthGuardService} from "../../shared/services";
import {InserirChopeEstoqueComponent} from "./inserir-chope-estoque/inserir-chope-estoque.component";
import {FormChopeComponent} from "./form-chope/form-chope.component";

const routes: Routes = [
    {
        path: 'chopes',
        component: ChopeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'chopes/novo',
        component: FormChopeComponent,
        canActivate: [ AuthGuardService ]
    },
    {
        path: 'chopes/inserir-estoque',
        component: InserirChopeEstoqueComponent,
        canActivate: [ AuthGuardService ]
    },
    {
        path: 'chopes/:id',
        component: FormChopeComponent,
        canActivate: [ AuthGuardService ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class ChopeRoute {
}
