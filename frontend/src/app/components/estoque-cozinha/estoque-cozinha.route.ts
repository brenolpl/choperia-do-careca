import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {EstoqueCozinhaComponent} from "./estoque-cozinha.component";


const routes: Routes = [
    {
        path: 'estoque-cozinha',
        component: EstoqueCozinhaComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class EstoqueCozinhaRoute {
}
