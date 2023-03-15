import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {Location} from "@angular/common";
import {DxDataGridComponent} from "devextreme-angular";
import notify from "devextreme/ui/notify";
import {RfidService} from "../../../shared/services/rfid.service";

interface Chope {
    id: number,
    nome: string,
    codigoBarras: string,
    quantidadeEstoque: number
}

@Component({
    templateUrl: './inserir-chope-estoque.component.html',
    styleUrls: [
        '../../../shared/components/abstract-list/abstract-list.component.css',
        '../../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class InserirChopeEstoqueComponent implements OnInit {
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid!: DxDataGridComponent;
    codigoRFID: string = "";
    chopesSelecionados: Chope[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private location: Location,
        private rfidService: RfidService
    ) {}

    ngOnInit() {
        this.rfidService.rfid.subscribe(rfid => {
            this.codigoRFID = rfid
        });
    }

    back() {
        this.location.back();
    }

    async getProdutoByCodigoBarras(codigo: string){
        return this.apiService.detail('chopes/codigo-rfid', codigo).toPromise();
    }

    adicionarProduto = async () => {

        const chope: Chope = await this.getProdutoByCodigoBarras(this.codigoRFID) as Chope;

        if(chope){
            const chopeSelecionado = this.chopesSelecionados.find(p => p.codigoBarras == chope.codigoBarras);
            if(!chopeSelecionado){
                this.chopesSelecionados.push({
                    id: chope.id,
                    nome: chope.nome,
                    quantidadeEstoque: 1,
                    codigoBarras: chope.codigoBarras
                })
            } else {
                chopeSelecionado.quantidadeEstoque ++;
            }
        }

        this.codigoRFID = "";
    }

    salvar() {
        this.apiService.post('chopes/adicionar-estoque', this.chopesSelecionados).subscribe(
            response => {
                notify("Produtos adicionados ao estoque com sucesso!", "success");
                this.back();
            }
        )
    }

}
