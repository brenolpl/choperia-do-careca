import {Component, ViewChild} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {Location} from "@angular/common";
import notify from "devextreme/ui/notify";


@Component({
    selector: 'relatorio-produtos-estoque',
    templateUrl: './relatorio-envio-email-component.html',
    styleUrls: [
        '../../../shared/components/abstract-list/abstract-list.component.css',
        '../../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class RelatorioEnvioEmailComponent {
    @ViewChild('relatorioTemplate') relatorioTemplate!: any;

    receitasDespesas: any[] = [];
    dataDe: any;
    dataAte: any;
    showTabela = false;
    emailText: string = "";

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
            dataDe: this.dataDe,
            dataAte: this.dataAte,
            mensagem: this.emailText
        };

        this.apiService.post('enviarEmail/send', params).subscribe(
            response => {
                this.emailText = "";
                notify('E-mail enviado com sucesso!', 'success', 2000);
            },
            error => {
                notify(error?.error?.message, 'error', 2000);
            }
        );
    }


    showCpfFormated(evt: any) {
        return evt.cliente.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    }


    formatTotalComprado = (container: any, options: any) => {
        if(options.data.id != 'total'){
            container.innerHTML = this.numberToReal(options.data.receita);
        } else {
            container.innerHTML = options.data.receita;
        }
    }

    formatTotalVendido = (container: any, options: any) => {
        if(options.data.id != 'total'){
            container.innerHTML = this.numberToReal(options.data.despesa);
        } else {
            container.innerHTML = options.data.despesa;
        }
    }

    formatStringNome =  (container: any, options: any) => {
        if(options.data.id != 'total'){
            container.innerHTML = options.data.nome;
        } else {
            container.innerHTML = `<strong>${options.data.nome}</strong>`;
        }
    }

    numberToReal(numero: number){
        console.log(numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    public back() {
        this.location.back();
    }
}
