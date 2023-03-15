import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {RfidService} from "../../../shared/services/rfid.service";
import {first} from "rxjs";
import notify from "devextreme/ui/notify";

@Component({
    selector: 'app-form-cartao-rfid',
    templateUrl: './form-cartao-rfid.component.html'
})
export class FormCartaoRfidComponent implements OnInit {
    codigosRfid: any[] = [];

    protected getRota(): string {
        return "cartao-rfid";
    }

    constructor(private location: Location,
                private router: Router,
                private route: ActivatedRoute,
                private apiService: ApiService,
                private rfidService: RfidService) {

    }

    ngOnInit() {
        this.rfidService.rfid.subscribe(rfid => {
            let processado = this.codigosRfid.find(c => c.codigo == rfid);
            console.log(this.codigosRfid);
            if(!processado && rfid.length > 4) this.codigosRfid.push({codigo: rfid});
        })
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
}
