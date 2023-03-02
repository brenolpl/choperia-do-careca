import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {UsuariosComponent} from "./usuarios.component";
import {FormUsuariosComponent} from "./form-usuarios/form-usuarios.component";

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'usuarios/novo',
    component: FormUsuariosComponent,
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuardService],
  exports: [RouterModule]
})
export class UsuariosRoute { }
