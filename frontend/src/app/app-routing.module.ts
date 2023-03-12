import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    ChangePasswordFormComponent,
    CreateAccountFormComponent,
    LoginFormComponent,
    ResetPasswordFormComponent
} from './shared/components';
import {AuthGuardService} from './shared/services';
import {ProfileComponent} from './pages/profile/profile.component';
import {DxDataGridModule, DxFormModule} from 'devextreme-angular';

const routes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'login-form',
        component: LoginFormComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'reset-password',
        component: ResetPasswordFormComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'create-account',
        component: CreateAccountFormComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'change-password/:recoveryCode',
        component: ChangePasswordFormComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: false}), DxDataGridModule, DxFormModule],
    providers: [AuthGuardService],
    exports: [RouterModule],
    declarations: [
        ProfileComponent,
    ]
})
export class AppRoutingModule {
}
