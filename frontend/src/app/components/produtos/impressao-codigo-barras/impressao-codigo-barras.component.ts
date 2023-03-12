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
        return 'produtos';
    }

    private listarEntidades() {
        this.apiService.get(this.getRota()).subscribe(
            (response) => {
                const produtos: any[] = [];
                (response as any[]).forEach(produto => {
                    produtos.push({
                        nome: produto.nome,
                        id: produto.id,
                        quantidadeImprimir: 0
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
        console.log(this.dataGrid.instance.getSelectedRowsData())
    }

    changeQuantidade($event: any, row: any) {
        row.data.quantidadeImprimir = Number($event.component._changedValue);
    }
}
