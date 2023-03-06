import {Component} from '@angular/core';
import {AbstractFormComponent} from "../../../shared/components/abstract-form/abstract-form.component";

@Component({
    templateUrl: './form-produto.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class FormProdutoComponent extends AbstractFormComponent {
    protected getRota(): string {
        return 'produtos';
    }
}
