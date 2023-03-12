import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../shared/services";
import {HomeComponent} from "./home.component";

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuardService],
    exports: [RouterModule]
})
export class HomeRoute {
}
