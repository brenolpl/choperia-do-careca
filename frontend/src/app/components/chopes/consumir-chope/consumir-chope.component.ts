import {Component, OnInit} from '@angular/core';
import {AbstractListComponent} from "../../../shared/components/abstract-list/abstract-list.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {Location} from "@angular/common";
import notify from "devextreme/ui/notify";
import {first} from "rxjs";


@Component({
    selector: 'app-consumir-chope',
    templateUrl: './consumir-chope.component.html',
    styleUrls: [
        '../../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class ConsumirChopeComponent extends AbstractListComponent implements OnInit {
    vincular: any;
    codigoRFID: string = '';
    associacao: any;

    constructor(router: Router, route: ActivatedRoute, apiService: ApiService, private location: Location) {
        super(router, route, apiService);
    }

    protected getRota(): string {
        return 'chopes';
    }

    override ngOnInit() {
        super.ngOnInit();
        this.codigoRFID = '';
        this.associacao = undefined;
    }

    protected override listarEntidades() {
        this.apiService.get(this.getRota()).subscribe(
            response => {
                this.entidades = (response as any[]).map(r => {
                    if (r.quantidadeEstoque > 0) r.emEstoque = true;
                    else r.emEstoque = false;

                    r.quantidade = 0;
                    return r;
                }).filter(e => e.emEstoque);
            }
        )
    }

    back() {
        this.location.back();
    }

    adicionar = ($event: any) => {
        if ($event.row.data.emEstoque) $event.row.data.quantidade = $event.row.data.quantidade + 1;
    }

    diminuir = ($event: any) => {
        if ($event.row.data.quantidade > 0) $event.row.data.quantidade = $event.row.data.quantidade - 1;
    }

    onSalvar($event: any) {
        if (!this.validarQuantidades()) {
            notify('Selecione pelo menos um chope!', 'error', 2000);
            return;
        }

        let body = this.entidades.filter((e: any) => e.quantidade > 0).map((r: any) => {
            let chope: any = {};
            chope.id = r.id;
            chope.quantidade = r.quantidade;
            return chope;
        });

        body = {
            'codigoRFID': this.codigoRFID,
            'chopes': body
        };

        this.apiService.post('associacao-cliente-cartao-rfid/consumir-chopes', body).pipe(first()).subscribe(
            _ => {
                notify('Transação realizada com sucesso!', 'success', 2000);
                setTimeout(
                    () => {
                        this.ngOnInit();
                        this.onInitialized(this.vincular);
                    },

                    2000
                )
            }
        )
    }

    vincularCartao = async () => {
        this.associacao = await this.apiService.get('associacao-cliente-cartao-rfid/getByCartaoRfid/' + this.codigoRFID).toPromise();
        if (!this.associacao) this.codigoRFID = '';
    }

    cancelar() {
        this.ngOnInit();
        this.onInitialized(this.vincular);
    }

    private validarQuantidades(): boolean {
        let chope = this.entidades.find((e: any) => e.quantidade > 0);

        if (chope) return true;

        return false;
    }

    onInitialized(e: any) {
        this.vincular = e;
        setTimeout(function () {
            e.component.focus();
        }, 0);
    }
}
