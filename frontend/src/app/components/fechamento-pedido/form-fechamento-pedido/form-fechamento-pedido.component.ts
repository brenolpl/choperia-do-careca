import {Component} from '@angular/core';
import {AbstractFormComponent} from "../../../shared/components/abstract-form/abstract-form.component";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";

interface Cliente {
    nome: string,
    cartaoVinculado: string,
}

@Component({
    selector: 'app-form-cliente',
    templateUrl: './form-fechamento-pedido.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class FormFechamentoPedidoComponent {
    clientes: Cliente[] = [];
    itensConsumidos: any[] = [];
    cartaoCliente: string = "";
    totalPagar: number = 0;
    recebido: number = 0;
    troco: number = 0;


    constructor(
        protected location: Location,
        protected router: Router,
        protected route: ActivatedRoute,
        protected apiService: ApiService
    ) {}


    getClienteByCartao(cartao: string): Cliente{
        console.log(cartao);
        return {
            nome: 'João Vitor',
            cartaoVinculado: '123123'
        }
    }

    enterCartaoCliente(){
        const cliente: Cliente = this.getClienteByCartao(this.cartaoCliente);

       const clienteFind = this.clientes.find(c => c.cartaoVinculado == cliente.cartaoVinculado);
       if(!clienteFind){
           this.clientes.push(cliente);
       }

        this.cartaoCliente = "";
    }

    changeValorRecebido(){
        this.troco = this.recebido - this.totalPagar;
    }

    onSalvar(){
        this.confirmarPagamento();
    }

    confirmarPagamento(){

    }

    public back() {
        this.location.back();
    }
}
