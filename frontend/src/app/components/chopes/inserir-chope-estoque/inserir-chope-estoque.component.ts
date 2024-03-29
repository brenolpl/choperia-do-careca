import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {Location} from "@angular/common";
import {DxDataGridComponent} from "devextreme-angular";
import notify from "devextreme/ui/notify";
import {RfidService} from "../../../shared/services/rfid.service";
import {Subscription} from "rxjs";

interface Chope {
    id: number,
    nome: string,
    cartaoRFID: string,
    quantidadeEstoque: number
}

@Component({
    templateUrl: './inserir-chope-estoque.component.html',
    styleUrls: [
        '../../../shared/components/abstract-list/abstract-list.component.css',
        '../../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class InserirChopeEstoqueComponent implements OnInit, OnDestroy {
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid!: DxDataGridComponent;
    codigoRFID: string = "";
    chopesSelecionados: Chope[] = [];
    rfidSubscription!: Subscription

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private location: Location,
        private rfidService: RfidService
    ) {}

    ngOnInit() {
        this.rfidSubscription = this.rfidService.rfid.subscribe(rfid => {
            this.codigoRFID = rfid.trim();
            this.adicionarProduto();
        });
    }

    back() {
        this.location.back();
    }

    async getChopeByRfid(codigo: string){
        if(codigo) {
            return this.apiService.detail('chopes/codigo-rfid', codigo).toPromise().catch(error => {
                notify('Chope não encontrado', 'error', 2000)
            });
        }

        return new Promise(() => null);
    }

    adicionarProduto = async () => {

        const chope: Chope = await this.getChopeByRfid(this.codigoRFID.trim()) as Chope;

        if(chope){
            const chopeSelecionado = this.chopesSelecionados.find(p => p.cartaoRFID == chope.cartaoRFID);
            if(!chopeSelecionado){
                this.chopesSelecionados.push({
                    id: chope.id,
                    nome: chope.nome,
                    quantidadeEstoque: 100,
                    cartaoRFID: chope.cartaoRFID
                })
            } else {
                chopeSelecionado.quantidadeEstoque = chopeSelecionado.quantidadeEstoque + 100;
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
     ngOnDestroy() {
        this.rfidSubscription.unsubscribe();
     }

    adicionar = ($event: any) => {
        $event.row.data.quantidadeEstoque = $event.row.data.quantidadeEstoque + 100;
    }

    diminuir = ($event: any) => {
        if($event.row.data.quantidadeEstoque > 0) $event.row.data.quantidadeEstoque = $event.row.data.quantidadeEstoque - 100;
        else {
            this.chopesSelecionados = this.chopesSelecionados.filter(c => c.id !== $event.row.data.id);
        }
    }
}
