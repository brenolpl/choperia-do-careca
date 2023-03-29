import {Component} from '@angular/core';
import {AbstractListComponent} from "../../shared/components/abstract-list/abstract-list.component";

@Component({
    selector: 'app-clientes',
    templateUrl: './fechamento-conta.component.html',
    styleUrls: [
        '../../shared/components/abstract-list/abstract-list.component.css',
        '../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class FechamentoContaComponent extends AbstractListComponent {
    protected getRota(): string {
        return 'associacao-cliente-cartao-rfid/fechamento-contas';
    }

}
