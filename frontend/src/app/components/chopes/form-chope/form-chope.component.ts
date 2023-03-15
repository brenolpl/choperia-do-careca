import {Component} from '@angular/core';
import {AbstractFormComponent} from "../../../shared/components/abstract-form/abstract-form.component";
import notify from "devextreme/ui/notify";

@Component({
    templateUrl: './form-chope.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class FormChopeComponent extends AbstractFormComponent {
    protected getRota(): string {
        return 'chopes';
    }
}
