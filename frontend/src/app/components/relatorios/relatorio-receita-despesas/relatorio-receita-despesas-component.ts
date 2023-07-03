import {Component, ViewChild} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {Location} from "@angular/common";
import notify from "devextreme/ui/notify";


@Component({
    selector: 'relatorio-produtos-estoque',
    templateUrl: './relatorio-receita-despesas-component.html',
    styleUrls: [
        '../../../shared/components/abstract-list/abstract-list.component.css',
        '../../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class RelatorioReceitaDespesasComponent {
    @ViewChild('relatorioTemplate') relatorioTemplate!: any;

    receitasDespesas: any[] = [];
    dataDe: any;
    dataAte: any;
    showTabela = false;

    constructor(private apiService: ApiService,
                private location: Location) {
    }


    filtrarRelatorio() {
        if (!this.dataDe || !this.dataAte) {
            notify('Data de e Data Até são obrigatórios', 'error');
            return;
        }
        if (this.dataDe.getTime() > this.dataAte.getTime()) {
            notify('Data de não pode ser maior que data até', 'error');
            return;
        }

        this.dataAte.setHours(23, 59, 59, 999);

        const params = {
            dataDe: this.dataDe.toLocaleString(),
            dataAte: this.dataAte.toLocaleString()
        };

        this.getReceitasDespesasPeriodo(params);
    }

    private getReceitasDespesasPeriodo(params: any) {
        this.apiService.filter('associacao-cliente-cartao-rfid/receitas-despesas-periodo', params).subscribe(
            response => {
                this.receitasDespesas = response as any[];
                this.showTabela = true;

                let totalReceita = 0;
                let totalDespesa = 0;
                this.receitasDespesas.forEach(receitaDespesa => {
                    totalReceita += receitaDespesa.receita;
                    totalDespesa += receitaDespesa.despesa;
                    receitaDespesa.total = receitaDespesa.receita - receitaDespesa.despesa;
                })

                this.receitasDespesas.push({
                    id: 'total',
                    data: 'Total Período',
                    receita: `<span class="badge bg-success">${this.numberToReal(totalReceita)}</span>`,
                    despesa: `<span class="badge bg-danger">${this.numberToReal(totalDespesa)}</span>`,
                    total: this.getLabelTotal(totalReceita - totalDespesa),
                })
            }
        )
    }

    getLabelTotal(total: number){
        if(total < 0){
            return `<span class="badge bg-danger">${this.numberToReal(total)}</span>`;
        } else {
            return `<span class="badge bg-success">${this.numberToReal(total)}</span>`;
        }
    }


    showCpfFormated(evt: any) {
        return evt.cliente.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    }


    formatTotalComprado = (container: any, options: any) => {
        if (options.data.id != 'total') {
            container.innerHTML = this.numberToReal(options.data.receita);
        } else {
            container.innerHTML = options.data.receita;
        }
    }

    formatTotalVendido = (container: any, options: any) => {
        if (options.data.id != 'total') {
            container.innerHTML = this.numberToReal(options.data.despesa);
        } else {
            container.innerHTML = options.data.despesa;
        }
    }

    formatTotal = (container: any, options: any) => {
        if (options.data.id != 'total') {
            container.innerHTML = this.numberToReal(options.data.total);
        } else {
            container.innerHTML = options.data.total;
        }
    }

    // formatColunaTotal = (container: any, options: any) => {
    //     if(options.data.id != 'total'){
    //         container.innerHtml = this.numberToReal(options.data.receita - options.data.despesa);
    //     } else {
    //         container.innerHTML = options.data.total;
    //     }
    // }

    formatStringNome = (container: any, options: any) => {
        if (options.data.id != 'total') {
            container.innerHTML = options.data.nome;
        } else {
            container.innerHTML = `<strong>${options.data.nome}</strong>`;
        }
    }

    numberToReal(numero: number) {
        console.log(numero.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
        return numero.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }

    open() {
        const htmlRelatorio = this.relatorioTemplate.nativeElement;
        const mywindow = window.open('', 'PRINT', 'height=800,width=800');

        const head = mywindow?.document.head;
        const links = document.querySelectorAll('link[rel="stylesheet"]');

        links.forEach((link: any) => {
            const newLink = mywindow?.document.createElement('link');
            newLink?.setAttribute('rel', 'stylesheet');
            newLink?.setAttribute('href', link.href);
            head?.appendChild(newLink!);
        });

        const styles = document.querySelectorAll('style');
        styles.forEach((style: any) => {
            const newStyle = mywindow?.document.createElement('style');
            newStyle!.textContent = style.textContent;
            const styleClone = style.cloneNode(true);
            head?.appendChild(styleClone!);
        });


        const clone = htmlRelatorio.cloneNode(true);
        mywindow?.document.body.appendChild(clone);


        setTimeout(() => {
            mywindow?.document.close();
            mywindow?.focus();

            mywindow?.print();
            mywindow?.close();
        }, 500);
    }


    public back() {
        this.location.back();
    }
}
