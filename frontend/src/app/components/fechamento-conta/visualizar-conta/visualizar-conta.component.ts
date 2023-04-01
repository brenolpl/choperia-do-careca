import {Component, OnInit} from "@angular/core";
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
    selector: 'app-visualizar-conta',
    templateUrl: './visualizar-conta.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class VisualizarContaComponent implements OnInit{

    itensConsumidos: TabelaItemConsumido[] = [];
    precoSelfService: any = 0;
    cartao: string | null = null;
    totalPagar = 0;
    clientes: any[]= [];

    constructor(
        protected location: Location,
        protected router: Router,
        protected route: ActivatedRoute,
        protected apiService: ApiService
    ) {
    }

    ngOnInit(){
        this.cartao = this.route.snapshot.paramMap.get('cartaoRFID');
        this.getPrecoSelfService();
        if(this.cartao) this.listarDadosCliente();
    }

    getAssociacaoClienteCartao(cartao: string) {
        return this.apiService.get('associacao-cliente-cartao-rfid/getByCartaoRfid/' + cartao).toPromise();
    }

    async listarDadosCliente() {
        const associacao: ConsultaCliente = await this.getAssociacaoClienteCartao(this.cartao!) as ConsultaCliente;

        this.clientes.push(associacao.cliente);

        const chopesConsumidos = associacao.itensConsumidos.filter((i: any) => i.chope !== null);
        if (chopesConsumidos?.length > 0) this.processarChopesConsumidos(chopesConsumidos);

        const itensConsumidos = associacao.itensConsumidos.filter((i: any) => i.chope === null);
        if (itensConsumidos?.length > 0) this.processarItensConsumidos(itensConsumidos);

        this.totalPagar = 0;
        this.itensConsumidos.forEach(i => this.totalPagar += i.total);
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

    private getPrecoSelfService() {
        this.apiService.get('self-service').pipe(first()).subscribe(
            (response: any) => {
                this.precoSelfService = response['preco'];
            }, error => {
                notify(error?.error?.message, 'error', 2000);
            }
        );
    }

    onSalvar() {
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
}
