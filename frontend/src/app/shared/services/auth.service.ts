import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {ApiService} from "./api.service";
import {catchError, delay, map, throwError} from "rxjs";

export interface IUser {
    email: string;
    avatarUrl?: string;
}

const defaultPath = '/';

@Injectable()
export class AuthService {
    private _user: IUser | null = null;

    get loggedIn(): boolean {
        return !!this._user;
    }

    private _lastAuthenticatedPath: string = defaultPath;
    set lastAuthenticatedPath(value: string) {
        this._lastAuthenticatedPath = value;
    }

    constructor(private router: Router, private apiService: ApiService) {
        const email = localStorage.getItem('email');
        if(email){
            this._user = {email: email};
        }
    }

    logIn(email: string, password: string) {
        return this.apiService.post('usuarios/login', {login: email, biometria: password}).pipe(delay(1000)).pipe(
            map((data: any) => {
                if(data){
                    localStorage.setItem('email', email);
                    localStorage.setItem('tipoUsuario', data.tipoUsuario.id);

                    this._user = {email: email};
                } else {
                    throw new Error('Login inválido!');
                }
            }),
            catchError(error => {
                return throwError(error);
            })
        );
    }

    async getUser() {
        try {
            // Send request

            return {
                isOk: true,
                data: this._user
            };
        } catch {
            return {
                isOk: false,
                data: null
            };
        }
    }

    async createAccount(email: string, password: string) {
        try {
            // Send request

            this.router.navigate(['/create-account']);
            return {
                isOk: true
            };
        } catch {
            return {
                isOk: false,
                message: "Failed to create account"
            };
        }
    }

    async changePassword(email: string, recoveryCode: string) {
        try {
            // Send request

            return {
                isOk: true
            };
        } catch {
            return {
                isOk: false,
                message: "Failed to change password"
            }
        }
    }

    async resetPassword(email: string) {
        try {
            // Send request

            return {
                isOk: true
            };
        } catch {
            return {
                isOk: false,
                message: "Failed to reset password"
            };
        }
    }

    async logOut() {
        this._user = null;
        localStorage.clear();
        this.router.navigate(['/login-form']);
    }
}

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const isLoggedIn = this.authService.loggedIn;
        const isAuthForm = [
            'login-form',
            'reset-password',
            'create-account',
            'change-password/:recoveryCode'
        ].includes(route.routeConfig?.path || defaultPath);

        if (isLoggedIn && isAuthForm) {
            this.authService.lastAuthenticatedPath = defaultPath;
            this.router.navigate([defaultPath]);
            return false;
        }

        if (!isLoggedIn && !isAuthForm) {
            this.router.navigate(['/login-form']);
        }

        if (isLoggedIn) {
            this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
        }

        return isLoggedIn || isAuthForm;
    }
}
