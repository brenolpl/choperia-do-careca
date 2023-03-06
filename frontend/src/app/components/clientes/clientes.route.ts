import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {ClientesComponent} from "./clientes.component";
import {FormClienteComponent} from "./form-cliente/form-cliente.component";

const routes: Routes = [
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'clientes/novo',
    component: FormClienteComponent,
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuardService],
  exports: [RouterModule]
})
export class ClientesRoute { }
