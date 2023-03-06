import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import {ClientesRoute} from "./clientes.route";
import {DxButtonModule, DxFormModule, DxToolbarModule} from "devextreme-angular";
import {DxiItemModule, DxoFormItemModule} from "devextreme-angular/ui/nested";



@NgModule({
  declarations: [
    FormClienteComponent
  ],
  imports: [
    ClientesRoute,
    CommonModule,
    DxToolbarModule,
    DxButtonModule,
    DxiItemModule,
    DxFormModule,
    DxoFormItemModule
  ]
})
export class ClientesModule { }
