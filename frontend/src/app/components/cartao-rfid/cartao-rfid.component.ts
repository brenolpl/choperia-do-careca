import {Component} from '@angular/core';
import {AbstractListComponent} from "../../shared/components/abstract-list/abstract-list.component";

@Component({
    selector: 'app-cartao-rfid',
    templateUrl: './cartao-rfid.component.html',
    styleUrls: ['../../shared/components/abstract-list/abstract-list.component.css']
})
export class CartaoRfidComponent extends AbstractListComponent{
    protected getRota(): string {
        return 'cartao-rfid';
    }
}
