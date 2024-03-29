import {Component} from '@angular/core';
import {AbstractListComponent} from "../../shared/components/abstract-list/abstract-list.component";

@Component({
    selector: 'app-chope',
    templateUrl: './chope.component.html',
    styleUrls: ['../../shared/components/abstract-list/abstract-list.component.css']
})
export class ChopeComponent extends AbstractListComponent {
    protected getRota(): string {
        return 'chopes';
    }

    navigateInserirEstoque(){
        this.router.navigate(['inserir-estoque'], {relativeTo: this.route});
    }

    navigateConsumirChope() {
        this.router.navigate(['consumir-chope'], {relativeTo: this.route});
    }
}
