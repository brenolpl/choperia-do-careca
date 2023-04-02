import {Component, ViewChild} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {Location} from "@angular/common";


@Component({
    selector: 'relatorio-produtos-estoque',
    templateUrl: './relatorio-chopes-mais-consumidos.html',
    styleUrls: [
        '../../../shared/components/abstract-list/abstract-list.component.css',
        '../../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class RelatorioChopesMaisConsumidos {
    @ViewChild('relatorioTemplate') relatorioTemplate!: any;


    produtos: any[] = [];
    chopes: any[] = [];

    constructor(private apiService: ApiService,
                private location: Location) {
        this.listarProdutos();
        this.listarChopes();
    }

    listarProdutos() {
        this.apiService.get('produtos').subscribe(
            response => {
                this.produtos = response as any[];
            }
        )
    }

    listarChopes(){
        this.apiService.get('chopes').subscribe(
            response => {
                this.chopes = response as any[];
            }
        )
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
