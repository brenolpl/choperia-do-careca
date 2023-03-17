import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {FechamentoPedidoComponent} from "./fechamento-pedido.component";
import {FormFechamentoPedidoComponent} from "./form-fechamento-pedido/form-fechamento-pedido.component";

const routes: Routes = [
    {
        path: 'fechamento-conta',
        component: FechamentoPedidoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'fechamento-conta/novo',
        component: FormFechamentoPedidoComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class FechamentoPedidoRoute {
}
