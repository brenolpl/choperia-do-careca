import {Component} from '@angular/core';
import {AbstractFormComponent} from "../../../shared/components/abstract-form/abstract-form.component";

@Component({
    selector: 'app-form-usuarios',
    templateUrl: './form-funcionarios.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class FormFuncionariosComponent extends AbstractFormComponent {
    protected getRota(): string {
        return 'usuarios';
    }
}
