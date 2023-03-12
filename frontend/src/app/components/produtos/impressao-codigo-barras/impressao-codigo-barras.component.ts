import {Component, ViewChild} from '@angular/core';
import {AbstractListComponent} from "../../../shared/components/abstract-list/abstract-list.component";
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

    criarTelaImpressao(codigosImprimir: string[]){
        const mywindow = window.open('', 'PRINT', 'height=400,width=600');


        mywindow?.document.write('<html><head><title>' + "Imprimir codigos"  + '</title>');
        mywindow?.document.write('</head><body style="display: inline; margin-left: 2 !important;"></body></html>');

        codigosImprimir.forEach(codigo => {
            const img = new Image();
            img.src = codigo;
            img.width = 200;
            img.height = 100;
            img.style.padding = '1em';
            mywindow?.document.body.appendChild(img);
        })


        mywindow?.document.close();
        mywindow?.focus();

        mywindow?.print();
        mywindow?.close();
    }

    changeQuantidade($event: any, row: any) {
        row.data.quantidadeImprimir = Number($event.component._changedValue);
    }
}
