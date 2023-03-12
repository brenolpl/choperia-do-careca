import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {Location} from "@angular/common";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
    templateUrl: './impressao-codigo-barras.component.html',
    styleUrls: [
        '../../../shared/components/abstract-list/abstract-list.component.css',
        '../../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class ImpressaoCodigoBarrasComponent {
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid!: DxDataGridComponent;
    produtosSelecionados: any[] = [];
    entidades: any[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.listarEntidades();
    }


    protected getRota(): string {
        return 'produtos/codigos';
    }

    private listarEntidades() {
        this.apiService.get(this.getRota()).subscribe(
            (response) => {
                const produtos: any[] = [];
                (response as any[]).forEach(produto => {
                    produtos.push({
                        nome: produto.nome,
                        id: produto.id,
                        quantidadeImprimir: 0,
                        codigoBarras: produto.codigoBarras,
                        codigoBarrasImg: produto.codigoBarrasImg
                    })
                })
                this.entidades = produtos;
            }
        )
    }

    back() {
        this.location.back();
    }

    selecionarProduto = (evt: any) => {
        this.produtosSelecionados = evt.selectedRowsData;
    }

    imprimir() {
        const selecionados = this.dataGrid.instance.getSelectedRowsData();
        const arrayCodigosBarras: string[] = [];

        selecionados.forEach(produto => {
            for(let i = 0; i < produto.quantidadeImprimir; i++){
                arrayCodigosBarras.push(produto.codigoBarrasImg);
            }
        })

        this.criarTelaImpressao(arrayCodigosBarras);
    }

    criarTelaImpressao(codigosImprimir: string[]) {
        const mywindow = window.open('', '_blank');


        mywindow?.document.write('<html><head><title>' + "Imprimir codigos"  + '</title>');
        mywindow?.document.write('</head><body style="margin: 0; display: grid"></div> </body></html>');

        let i = 1;
        let inserirDiv = false;
        let div = this.createDiv();
        codigosImprimir.forEach(codigo => {
            inserirDiv = false;
            const img = new Image();
            img.src = codigo;
            img.style.width = '3.2cm';
            img.style.height = '1.8cm';
            img.style.padding = '2px';
            img.style.marginLeft = '0.15cm';
            img.style.marginTop = '0.1cm';
            div.appendChild(img);
            if(i % 3 == 0) {
                inserirDiv = true;
                mywindow?.document.body.appendChild(div);
                div = this.createDiv();
            }
            i++;
        });

        if(!inserirDiv) {
            mywindow?.document.body.appendChild(div);
        }

        setTimeout(() => {
            mywindow?.document.close();
            mywindow?.focus();

            mywindow?.print();
            mywindow?.close();
        }, 200);
    }

    changeQuantidade($event: any, row: any) {
        row.data.quantidadeImprimir = Number($event.component._changedValue);
    }

    private createDiv(): HTMLElement {
        let div = document.createElement('div');
        div.style.marginLeft = '1cm';
        div.style.display = 'inline';
        div.style.maxWidth = '10.5cm';
        return div;
    }
}
