import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {CartaoRfidComponent} from "./cartao-rfid.component";
import {FormCartaoRfidComponent} from "./form-cartao-rfid/form-cartao-rfid.component";

const routes: Routes = [
    {
        path: 'cartao-rfid',
        canActivate: [AuthGuardService],
        children: [
            {path: '',component: CartaoRfidComponent},
            {path: 'novo', component: FormCartaoRfidComponent},
            {path: ':id', component: FormCartaoRfidComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class CartaoRfidRoute {
}
