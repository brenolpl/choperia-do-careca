import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from "devextreme-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {confirm} from "devextreme/ui/dialog";
import {ApiService} from "../../shared/services/api.service";
import notify from "devextreme/ui/notify";
import {AbstractListComponent} from "../../shared/components/abstract-list.component";

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['../../layouts/table-list/table-list.component.css']
})
export class ClientesComponent extends AbstractListComponent{
    protected getRota(): string {
        return 'clientes';
    }
}
