import {Component} from '@angular/core';
import {AbstractListComponent} from "../../shared/components/abstract-list/abstract-list.component";

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['../../shared/components/abstract-list/abstract-list.component.css']
})
export class ClientesComponent extends AbstractListComponent{
    protected getRota(): string {
        return 'clientes';
    }
}
