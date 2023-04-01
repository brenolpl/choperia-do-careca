import {Component, OnDestroy, OnInit} from '@angular/core';
import notify from "devextreme/ui/notify";
import {ApiService} from "../../shared/services/api.service";
import {Subscription} from "rxjs";

@Component({
    templateUrl: './verificar-saida.component.html',
    styleUrls: ['../../shared/components/abstract-form/abstract-form.component.scss']
})
export class VerificarSaidaComponent implements OnDestroy, OnInit {
    cartaoCliente: any = '';
    nomeCliente: any = '';
    cartaoClienteBox: any;
    private associacao: any;
    private cartaoClienteSubscription!: Subscription;
    statusCliente: string = '...';


    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.cartaoClienteSubscription?.unsubscribe();
    }

    enterCartaoCliente() {
        this.cartaoClienteSubscription = this.apiService.get('associacao-cliente-cartao-rfid/getByCartaoRfid/' + this.cartaoCliente).subscribe(
            (next: any) => {
                this.associacao = next;
                this.nomeCliente = next.cliente.nome;
                this.statusCliente = 'Em débito';
            },
            error => {
                this.statusCliente = 'Pago';
            }
        );
    }

    onInitialized(e: any) {
        this.cartaoClienteBox = e;
        setTimeout(function () {
            e.component.focus();
        }, 0);
    }
}
