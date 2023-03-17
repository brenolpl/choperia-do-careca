import {Component} from '@angular/core';
import {AbstractFormComponent} from "../../../shared/components/abstract-form/abstract-form.component";

@Component({
    selector: 'app-form-cliente',
    templateUrl: './form-pratos-self-service.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class FormPratosSelfServiceComponent extends AbstractFormComponent {
    protected getRota(): string {
        return 'pratos';
    }
}
