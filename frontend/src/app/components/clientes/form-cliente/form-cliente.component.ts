import {Component} from '@angular/core';
import {AbstractFormComponent} from "../../../shared/components/abstract-form/abstract-form.component";

@Component({
    selector: 'app-form-cliente',
    templateUrl: './form-cliente.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class FormClienteComponent extends AbstractFormComponent {
    protected getRota(): string {
        return 'clientes';
    }
}
