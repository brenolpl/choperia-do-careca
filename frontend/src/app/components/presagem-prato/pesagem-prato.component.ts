import {Component, OnDestroy, OnInit} from '@angular/core';
import notify from "devextreme/ui/notify";
import {ApiService} from "../../shared/services/api.service";
import {BalancaService} from "../../shared/services/balanca-service";
import {first, Subscription} from "rxjs";

@Component({
    templateUrl: './pesagem-prato.component.html',
    styleUrls: ['../../shared/components/abstract-form/abstract-form.component.scss']
})
export class PesagemPratoComponent implements OnDestroy, OnInit {
    precoSelfService: any = 0;
    cartaoCliente: any = '';
    nomeCliente: any = '';
    totalPagar: any = 0;
    pesoPrato: any = 0;
    cartaoClienteBox: any;
    private associacao: any;
    private balancaSubscription!: Subscription;
    private cartaoClienteSubscription!: Subscription;


    constructor(private apiService: ApiService,
                private balancaService: BalancaService) {
    }

    ngOnInit(): void {
        this.pesoPrato = 0;
        this.getPrecoSelfService();
        this.balancaSubscription = this.balancaService.pesoObservable.subscribe(peso => {
            this.pesoPrato = parseFloat(peso);
            this.calcularTotal();
        })
    }

    private getPrecoSelfService() {
        this.apiService.get('self-service').pipe(first()).subscribe(
            (response: any) => {
                this.precoSelfService = response['preco'];
            }, error => {
                notify(error?.error?.message, 'error', 2000);
            }
        );
    }


    salvar() {
        let body = {
            idAssociacao: this.associacao.id,
            totalPagar: this.totalPagar
        }
        this.apiService.post('associacao-cliente-cartao-rfid/addSelfService', body).pipe(first()).subscribe(
            next => {
                notify('Transação realizada com sucesso!', 'success', 2000);
                this.nomeCliente = '';
                this.cartaoCliente = null;
                this.ngOnInit();
                this.onInitialized(this.cartaoClienteBox);
            },
            error => {
                notify(error?.error?.message, 'error', 2000);
            }
        )
    }

    showAdicionarCartaoCliente() {
        if (this.cartaoCliente != "" && this.nomeCliente != "" && this.totalPagar > 0) return true;
        return false;
    }

    ngOnDestroy(): void {
        this.balancaSubscription?.unsubscribe();
        this.cartaoClienteSubscription?.unsubscribe();
    }

    private calcularTotal() {
        this.totalPagar = parseFloat((this.pesoPrato * this.precoSelfService).toFixed(2));
    }

    enterCartaoCliente() {
        this.cartaoClienteSubscription = this.apiService.get('associacao-cliente-cartao-rfid/getByCartaoRfid/' + this.cartaoCliente).subscribe(
            (next: any) => {
                this.associacao = next;
                this.nomeCliente = next.cliente.nome;
                this.calcularTotal();
            },
            error => notify(error?.error?.message, 'error', 2000)
        );
    }

    onInitialized(e: any) {
        this.cartaoClienteBox = e;
        setTimeout(function () {
            e.component.focus();
        }, 0);
    }
}
