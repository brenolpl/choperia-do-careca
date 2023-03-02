import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import {ProdutosRoute} from "./produtos.route";


@NgModule({
  declarations: [
    ProdutosComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoute
  ],
  exports: [

  ]
})
export class ProdutosModule { }
