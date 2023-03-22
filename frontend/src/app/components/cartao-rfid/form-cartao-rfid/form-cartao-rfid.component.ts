import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {first} from "rxjs";
import notify from "devextreme/ui/notify";
import {DxTextBoxComponent} from "devextreme-angular";

@Component({
    selector: 'app-form-cartao-rfid',
    templateUrl: './form-cartao-rfid.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class FormCartaoRfidComponent implements OnInit {
    codigosRfid: any[] = [];
    codigoRFID!: string;

    protected getRota(): string {
        return "cartao-rfid";
    }

    constructor(private location: Location,
                private router: Router,
                private route: ActivatedRoute,
                private apiService: ApiService) {

    }

    ngOnInit() {

    }

    onSalvar() {
        if(this.codigosRfid.length == 0) {
            notify('É necessário incluir pelo menos um cartão RFID!', 'error', 2000);
            return
        }
        this.apiService.post('cartao-rfid/salvarCartoes', this.codigosRfid).pipe(first()).subscribe(
            next => {
                this.router.navigate(['../'], {relativeTo: this.route});
            }
        )
    }

    back() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    adicionarCartao = async () => {
        let cartao = await this.getCartaoByCodigo();
        if(cartao) notify('Este cartão já está cadastrado!', 'error', 2000);
        else {
            let adicionado = this.codigosRfid.find(f => f.codigo == this.codigoRFID);
            if (!adicionado) this.codigosRfid.push({codigo: this.codigoRFID});
            else notify('Este cartão já foi lido!', 'warning', 2000);
        }
        this.codigoRFID = '';
    }

    onInitialized(e: any) {
        setTimeout(function () {
            e.component.focus();
        }, 0);
    }

    excluir = ($event: any) => this.codigosRfid = this.codigosRfid.filter(c => c.codigo !== $event.row.data.codigo);

    async getCartaoByCodigo(){
        if(this.codigoRFID.length==10) {
            return this.apiService.get('cartao-rfid/' + this.codigoRFID).toPromise().catch(_ => {});
        }

        return new Promise(() => null);
    }
}
