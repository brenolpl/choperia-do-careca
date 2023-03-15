import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";

interface Cliente {
    nome: string,
    cartaoVinculado: string,
}

interface ItemConsumido {
    nome: string,
    preco: number,
    quantidade: number,
    total: number
}

@Component({
    selector: 'app-form-cliente',
    templateUrl: './form-fechamento-pedido.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class FormFechamentoPedidoComponent implements OnInit {
    clientes: Cliente[] = [];
    itensConsumidos: ItemConsumido[] = [];
    cartaoCliente: string = "";
    totalPagar: number = 0;
    recebido: number = 0;
    troco: number = 0;


    constructor(
        protected location: Location,
        protected router: Router,
        protected route: ActivatedRoute,
        protected apiService: ApiService
    ) {
    }

    ngOnInit() {
        this.clientes = [
            {cartaoVinculado: '123123', nome: 'João Vitor'},
            {cartaoVinculado: '456456', nome: 'Gusthavo Com H'}
        ]

        this.itensConsumidos = [
            {nome: 'Chope 1', preco: 15, quantidade: 2, total: 30},
            {nome: 'Chope 4', preco: 10, quantidade: 3, total: 30},
            {nome: 'Self Service', preco: 20, quantidade: 1, total: 20},
            {nome: 'Self Service', preco: 25, quantidade: 1, total: 25},
        ]

        this.calcularTotalAPagar();
    }


    getClienteByCartao(cartao: string): Cliente {
        console.log(cartao);
        return {
            nome: 'João Vitor',
            cartaoVinculado: '123123'
        }
    }

    enterCartaoCliente() {
        const cliente: Cliente = this.getClienteByCartao(this.cartaoCliente);

        const clienteFind = this.clientes.find(c => c.cartaoVinculado == cliente.cartaoVinculado);
        if (!clienteFind) {
            this.clientes.push(cliente);
        }

        this.cartaoCliente = "";
    }

    calcularTotalAPagar() {
        let total = 0;
        this.itensConsumidos.forEach(item => {
            total += item.total;
        })
        this.totalPagar = total;
    }

    changeValorRecebido() {
        this.troco = this.recebido - this.totalPagar;
    }

    onSalvar(button: any) {
        this.confirmarPagamento(button);
    }

    confirmarPagamento(button: any) {

        // confirmar no backend



        this.imprimirComprovante();
    }

    imprimirComprovante() {
        const mywindow = window.open('', 'PRINT', 'height=800,width=800');

        mywindow?.document.write('<html><head><title>' + "Choperia do Careca" + '</title>');
        mywindow?.document.write('</head><body style="margin: 0; display: grid"></div> </body></html>');

        const divPrincipal = this.createDivPrincipal();

        divPrincipal.appendChild(this.createTableItensConsumidos());

        divPrincipal.appendChild(this.getDivTotalConsumido());


        mywindow?.document.body.appendChild(divPrincipal);

        setTimeout(() => {
            mywindow?.document.close();
            mywindow?.focus();

            mywindow?.print();
            mywindow?.close();
            this.back();
        }, 200);
    }

    private createDivPrincipal(): HTMLElement {
        let div = document.createElement('div');
        div.style.maxWidth = '8cm';
        return div;
    }

    private createTableItensConsumidos() {
        const table = document.createElement('table');
        const head = document.createElement('thead');
        const linha = document.createElement('tr');
        const colunaNome = document.createElement('td');
        const colunaPreco = document.createElement('td');
        const colunaQuantidade = document.createElement('td');
        const colunaTotal = document.createElement('td');

        table.style.width = '100%';

        colunaNome.innerText = 'Nome';
        colunaPreco.innerText = 'Preço';
        colunaQuantidade.innerText = 'Qtd';
        colunaTotal.innerText = 'Total';

        linha.append(colunaNome, colunaPreco, colunaQuantidade, colunaTotal);
        head.append(linha);
        table.append(head);
        table.appendChild(this.createLinhasTabelaItensConsumidos());

        return table;
    }

    private getDivTotalConsumido(): HTMLElement {
        const div = document.createElement('div');

        div.innerHTML = `
            <hr>
            <table style="width: 100%">
                <tr>
                    <td>Total pago:</td>
                    <td>${this.numberToReal(this.totalPagar)}</td>
                </tr>
            </table>
        `;

        return div;
    }

    numberToReal(number: number){
        return number.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }

    private createLinhasTabelaItensConsumidos(): HTMLElement {
        const tbody = document.createElement('tbody');
        this.itensConsumidos.forEach(item => {
            const tr = document.createElement('tr');
            const colunaNome = document.createElement('td');
            const colunaPreco = document.createElement('td');
            const colunaQuantidade = document.createElement('td');
            const colunaTotal = document.createElement('td');

            colunaNome.innerText = item.nome;
            colunaPreco.innerText = this.numberToReal(item.preco);
            colunaQuantidade.innerText = String(item.quantidade);
            colunaTotal.innerText = this.numberToReal(item.total);

            tr.append(colunaNome, colunaPreco, colunaQuantidade, colunaTotal);
            tbody.append(tr);
        })

        return tbody;
    }

    public back() {
        this.location.back();
    }
}
