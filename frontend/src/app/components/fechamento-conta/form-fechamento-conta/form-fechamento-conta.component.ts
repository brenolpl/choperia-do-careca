import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import notify from "devextreme/ui/notify";
import {first} from "rxjs";

interface Chope {
    id: number,
    cartaoRFID: string,
    nome: string,
    precoCompra: number,
    precoVenda: number,
    quantidadeEstoque: number
}

interface Cliente {
    nome: string,
    cpf: string
}

interface ItemConsumido {
    id: string,
    nome: string,
    preco: number,
    chope: Chope
}

interface ConsultaCliente {
    cliente: Cliente,
    itensConsumidos: ItemConsumido[],
    id: string,
    dataEntrada: string
}

interface TabelaItemConsumido {
    nome: string,
    preco: number,
    quantidade: number,
    total: number
}

@Component({
    selector: 'app-form-cliente',
    templateUrl: './form-fechamento-conta.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class FormFechamentoContaComponent implements OnInit {
    clientes: Cliente[] = [];
    itensConsumidos: TabelaItemConsumido[] = [];
    cartaoCliente: string = "";
    totalPagar: number = 0;
    recebido: number = 0;
    troco: number = 0;
    precoSelfService: any = 0;
    private associacoes: any[] = [];


    constructor(
        protected location: Location,
        protected router: Router,
        protected route: ActivatedRoute,
        protected apiService: ApiService
    ) {
    }

    ngOnInit() {
        this.associacoes = [];
        this.clientes = [];
        this.itensConsumidos = [];
        this.totalPagar = 0;
        this.recebido = 0;
        this.troco = 0;
        this.getPrecoSelfService();
    }


    getAssociacaoClienteCartao(cartao: string) {
        return this.apiService.get('associacao-cliente-cartao-rfid/getByCartaoRfid/' + cartao).toPromise();
    }

    async enterCartaoCliente() {
        const associacao: ConsultaCliente = await this.getAssociacaoClienteCartao(this.cartaoCliente) as ConsultaCliente;

        const associacaoJaProcessada = this.associacoes.find(f => f.id == associacao?.id);
        if (associacaoJaProcessada) {
            notify('Este cartão já foi lido!', 'error', 2000);
            this.cartaoCliente = '';
            return;
        } else if (!associacao) {
            notify('Este cartão não está vinculado a nenhum cliente!', 'error', 2000);
            this.cartaoCliente = '';
            return;
        }

        this.associacoes.push(associacao);
        this.clientes.push(associacao.cliente);

        const chopesConsumidos = associacao.itensConsumidos.filter((i: any) => i.chope !== null);
        if (chopesConsumidos?.length > 0) this.processarChopesConsumidos(chopesConsumidos);

        const itensConsumidos = associacao.itensConsumidos.filter((i: any) => i.chope === null);
        if (itensConsumidos?.length > 0) this.processarItensConsumidos(itensConsumidos);

        this.cartaoCliente = "";

        this.totalPagar = 0;
        this.itensConsumidos.forEach(i => this.totalPagar += i.total);
    }

    changeValorRecebido() {
        this.troco = this.recebido - this.totalPagar;
    }

    onSalvar(button: any) {
        this.confirmarPagamento(button);
    }

    confirmarPagamento(button: any) {
        if (this.associacoes.length < 0) {
            notify('É necessário consultar pelo menos um cartão!', 'warning', 2000);
            return;
        }

        // this.apiService.post('associacao-cliente-cartao-rfid/fechar-pedido', this.associacoes).pipe(first()).subscribe(
        //     _ => {
        //         notify('Transação realizada com sucesso!', 'success', 2000);
        //         this.ngOnInit();
        //     },
        //     _ => {
        //         notify('Erro ao realizar trasação.', 'error', 2000);
        //         this.ngOnInit();
        //     }
        // )


        this.imprimirComprovante();
    }

    imprimirComprovante() {
        const mywindow = window.open('', 'PRINT', 'height=800,width=800');

        mywindow?.document.write('<html><head><title>' + "Choperia do Careca" + '</title>');
        mywindow?.document.write('</head><body style="margin: 0; display: grid"></div> </body></html>');

        const divPrincipal = this.createDivPrincipal();

        divPrincipal.appendChild(this.createCabecalhoCupom());

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

    private createCabecalhoCupom(): HTMLElement {
        const div = document.createElement('div');

        div.innerHTML = `
           <small>${new Date().toLocaleString()}</small>
           <h3 style="text-align: center">Choperia do Careca</h3>
           <hr>
        `;

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
        colunaTotal.style.textAlign = 'right';

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
                    <td colspan="3">Total pago:</td>
                    <td style="text-align: right">${this.numberToReal(this.totalPagar)}</td>
                </tr>
            </table>
        `;

        return div;
    }

    numberToReal(number: number) {
        return number.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
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
            colunaTotal.style.textAlign = 'right';

            tr.append(colunaNome, colunaPreco, colunaQuantidade, colunaTotal);
            tbody.append(tr);
        })

        return tbody;
    }

    public back() {
        this.location.back();
    }

    onInitialized(e: any) {
        setTimeout(function () {
            e.component.focus();
        }, 0);
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

    private processarChopesConsumidos(chopesConsumidos: ItemConsumido[]) {
        console.log(chopesConsumidos)
        const chope = chopesConsumidos[0].chope;
        const chopesIguais = chopesConsumidos.filter(c => c.chope.id == chope.id);
        const itemJaListado: TabelaItemConsumido | undefined = this.itensConsumidos.find(i => i.nome === chope.nome);
        if (itemJaListado) {
            const index = this.itensConsumidos.indexOf(itemJaListado);
            itemJaListado.total += (chopesIguais.length * chope.precoVenda);
            itemJaListado.quantidade += chopesIguais.length;
            this.itensConsumidos[index] = itemJaListado;
        } else {
            this.itensConsumidos.push({
                nome: chope.nome,
                preco: chope.precoVenda,
                total: chope.precoVenda * chopesIguais.length,
                quantidade: chopesIguais.length
            });
        }

        chopesConsumidos = chopesConsumidos.filter(c => c.chope.id !== chope.id);

        if (chopesConsumidos?.length > 0) this.processarChopesConsumidos(chopesConsumidos);
    }

    private processarItensConsumidos(itensConsumidos: ItemConsumido[]) {
        const item = itensConsumidos[0];
        const itensIguais = itensConsumidos.filter(i => i.nome == item.nome);

        const precoItem = item.nome == 'Self-Service' ? this.precoSelfService : item.preco;

        this.itensConsumidos.push({
            nome: item.nome,
            preco: precoItem,
            total: item.preco * itensIguais.length,
            quantidade: itensIguais.length
        })

        itensConsumidos = itensConsumidos.filter(i => i.nome !== item.nome);
        if (itensConsumidos?.length > 0) this.processarItensConsumidos(itensConsumidos);
    }
}
