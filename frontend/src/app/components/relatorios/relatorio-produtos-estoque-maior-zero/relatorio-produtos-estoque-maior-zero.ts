import {Component, ViewChild} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {Location} from "@angular/common";


@Component({
    selector: 'relatorio-produtos-estoque-maior-zero',
    templateUrl: './relatorio-produtos-estoque-maior-zero.html',
    styleUrls: [
        '../../../shared/components/abstract-list/abstract-list.component.css',
        '../../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class RelatorioProdutosEstoqueMaiorZero {
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
                (response as any[]).forEach(produto => {
                    if (produto.quantidadeEstoque > 0) this.produtos.push(produto);
                })
            }
        )
    }

    listarChopes() {
        this.apiService.get('chopes').subscribe(
            response => {
                (response as any[]).forEach(chope => {
                    if (chope.quantidadeEstoque > 0) this.chopes.push(chope);
                })
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
