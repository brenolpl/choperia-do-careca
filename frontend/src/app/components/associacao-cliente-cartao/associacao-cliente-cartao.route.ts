import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {AssociacaoClienteCartaoComponent} from "./associacao-cliente-cartao.component";
import {
    AssociacaoClienteCartaoFormComponent
} from "./associacao-cliente-cartao-form/associacao-cliente-cartao-form.component";
import {FormFechamentoPedidoComponent} from "./form-fechamento-pedido/form-fechamento-pedido.component";
import {HistoricoComponent} from "./historico/historico.component";

const routes: Routes = [
    {
        path: 'associacao-cliente-cartao',
        canActivate: [AuthGuardService],
        children: [
            {path: '', component: AssociacaoClienteCartaoComponent},
            {path: 'novo', component: AssociacaoClienteCartaoFormComponent},
            {path: 'fechar-pedido', component: FormFechamentoPedidoComponent},
            {path: 'historico', component: HistoricoComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class AssociacaoClienteCartaoRoute {
}
