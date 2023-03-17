import {Component} from '@angular/core';
import {AbstractListComponent} from "../../shared/components/abstract-list/abstract-list.component";
import notify from "devextreme/ui/notify";

export interface Prato {
    id: string,
    nome: string,
    statusPrato: string
}

@Component({
    selector: 'app-clientes',
    templateUrl: './pratos-self-service.component.html',
    styleUrls: ['../../shared/components/abstract-list/abstract-list.component.css']
})
export class PratosSelfServiceComponent extends AbstractListComponent{
    protected getRota(): string {
        return 'pratos';
    }

    public alterarStatusPrato = (evt: any) => {
        const prato: Prato = evt.row.data;

        if(prato.statusPrato == 'PRONTO'){
            prato.statusPrato = 'ACABANDO';
        } else if (prato.statusPrato == 'ACABANDO'){
            prato.statusPrato = 'EM_PRODUCAO';
        } else if (prato.statusPrato == 'EM_PRODUCAO'){
            prato.statusPrato = 'PRONTO';
        }

        this.alterarStatusPratoRequisicao(prato);
    }

    private alterarStatusPratoRequisicao(prato: Prato){
        this.apiService.patch('pratos', prato.id, prato).subscribe(
            () => {
                this.listarEntidades();
            }, () => {
                notify('Ocorreu um erro ao tentar editar status do prato', 'error');
            }
        )
    }
}
