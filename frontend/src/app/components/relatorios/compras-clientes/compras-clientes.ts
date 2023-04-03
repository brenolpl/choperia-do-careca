import {Component, ViewChild} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {Location} from "@angular/common";
import notify from "devextreme/ui/notify";


@Component({
    selector: 'relatorio-produtos-estoque',
    templateUrl: './compras-clientes.html',
    styleUrls: [
        '../../../shared/components/abstract-list/abstract-list.component.css',
        '../../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class ComprasClientes {
    @ViewChild('relatorioTemplate') relatorioTemplate!: any;


    produtos: any[] = [];
    chopes: any[] = [];
    dataDe: any;
    dataAte: any;
    showTabela = false;

    constructor(private apiService: ApiService,
                private location: Location) {
    }


    listarChopes(){
        if(!this.dataDe || !this.dataAte){
            notify('Data de e Data Até são obrigatórios', 'error');
            return;
        }
        if(this.dataDe.getTime() > this.dataAte.getTime()){
            notify('Data de não pode ser maior que data até', 'error');
            return;
        }

        this.dataAte.setHours(23, 59, 59, 999);

        const params = {
            dataDe: this.dataDe.toLocaleString(),
            dataAte: this.dataAte.toLocaleString()
        };

        this.apiService.filter('clientes/compras-periodo', params).subscribe(
            response => {
                this.showTabela = true;
                this.chopes = response as any[];
            }
        )
    }

    filtrarRelatorio(){
        this.listarChopes();
    }

    showCpfFormated(evt: any){
        return evt.cliente.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
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
