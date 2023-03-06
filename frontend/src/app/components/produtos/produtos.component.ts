import {Component} from '@angular/core';
import {AbstractListComponent} from "../../shared/components/abstract-list/abstract-list.component";

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.component.html',
    styleUrls: ['../../shared/components/abstract-list/abstract-list.component.css']
})
export class ProdutosComponent extends AbstractListComponent {
    protected getRota(): string {
        return 'produtos';
    }
}
