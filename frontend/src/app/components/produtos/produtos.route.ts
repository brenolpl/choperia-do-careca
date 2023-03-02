import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProdutosComponent} from "./produtos.component";
import {AuthGuardService} from "../../shared/services";

const routes: Routes = [
  {
    path: 'produtos',
    component: ProdutosComponent,
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuardService],
  exports: [RouterModule]
})
export class ProdutosRoute { }
