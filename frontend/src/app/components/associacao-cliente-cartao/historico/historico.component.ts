import { Component} from '@angular/core';
import {AbstractListComponent} from "../../../shared/components/abstract-list/abstract-list.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent extends AbstractListComponent{


    constructor(router: Router, route: ActivatedRoute, apiService: ApiService, private location: Location) {
        super(router, route, apiService);
    }

    protected getRota(): string {
        return 'associacao-cliente-cartao-rfid';
    }

    protected override listarEntidades() {
        this.apiService.get('associacao-cliente-cartao-rfid').subscribe(
            (response: any) => {
                this.entidades = response as any[];
            }
        )
    }

    back() {
        this.location.back();
    }
}
