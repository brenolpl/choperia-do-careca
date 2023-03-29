import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {first} from "rxjs";
import notify from "devextreme/ui/notify";
import {Location} from "@angular/common";
import {confirm} from 'devextreme/ui/dialog';

@Component({
    selector: 'app-associacao-cliente-cartao-form',
    templateUrl: './associacao-cliente-cartao-form.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class AssociacaoClienteCartaoFormComponent implements OnInit {
    cliente: any = {};
    cpfCliente: string = '';
    nomeCliente: string = '';
    cartaoCliente: string = '';
    telefoneCliente: string = '';

    constructor(private router: Router,
                private route: ActivatedRoute,
                private apiService: ApiService,
                private location: Location) {
    }

    ngOnInit(): void {

    }

    back() {
        this.location.back();
    }

    onSalvar($event: any) {
        if (!this.cliente || !this.cartaoCliente) {
            notify('Corrija os erros no cadastro antes de salvar!', 'error', 2000);
            return;
        }

        let body = {
            'cartaoRFID': {
                'codigo': this.cartaoCliente
            },
            'cliente': {
                'id': this.cliente.id
            }
        }
        this.apiService.post('associacao-cliente-cartao-rfid', body).pipe(first()).subscribe(
            (data: any) => {
                this.location.back();
            }
        )
    }

    excluir() {

    }

    pesquisarCliente = async () => {
        if (this.cpfCliente.length < 11) return;
        let cliente: any = await this.apiService.get('clientes/porCpf/' + this.cpfCliente).toPromise().catch(
            error => {
                if ((error?.error?.message as string).includes('cadastrado')) {
                    let result = confirm("<i>" + error?.error?.message + " Deseja cadastrá-lo agora?</i>", "Cliente inexistente");
                    result.then((dialogResult) => {
                        if (dialogResult) this.router.navigate(['clientes/novo']);
                    });
                } else notify(error?.error?.message, 'error', 2000);
            }
        );
        if (cliente) {
            this.cliente = cliente;
            this.nomeCliente = cliente.nome;
            this.telefoneCliente = cliente.telefone;
        }
    }


    onInitialized(e: any) {
        setTimeout(function () {
            e.component.focus();
        }, 0);
    }

    pesquisarCartao = async (e: any) => {
        let cartao = await this.apiService.get('cartao-rfid/esta-associado/' + this.cartaoCliente).toPromise().catch(
            error => {
                notify(error?.error?.message, 'error', 2000);
            }
        );

        if (!cartao) {
            this.cartaoCliente = '';
        }

    }
}
