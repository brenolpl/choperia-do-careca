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
        return 'associacao-cliente-cartao-rfid/contasPagas';
    }

    showCpfFormated(evt: any){
        return evt.cliente.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    }
}
