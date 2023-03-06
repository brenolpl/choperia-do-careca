import {Component} from '@angular/core';
import {AbstractListComponent} from "../../shared/components/abstract-list/abstract-list.component";

@Component({
    selector: 'app-usuarios',
    templateUrl: './funcionarios.component.html',
    styleUrls: [
        '../../shared/components/abstract-list/abstract-list.component.css'
    ]
})
export class FuncionariosComponent extends AbstractListComponent {
    protected getRota(): string {
        return 'usuarios';
    }
}
