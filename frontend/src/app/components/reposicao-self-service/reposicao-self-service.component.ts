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
    templateUrl: './reposicao-self-service.component.html',
    styleUrls: ['../../shared/components/abstract-list/abstract-list.component.css']
})
export class ReposicaoSelfServiceComponent extends AbstractListComponent{
    protected getRota(): string {
        return 'pratos';
    }

    public alterarStatusPrato = (evt: any) => {
        const prato: Prato = evt.row.data;

        if(prato.statusPrato == 'PRONTO'){
            prato.statusPrato = 'ACABANDO';
        } else if (prato.statusPrato == 'ACABANDO'){
            notify('Você já pediu reposição desse item!', 'warning');
            return;
        } else if (prato.statusPrato == 'EM_PRODUCAO'){
            notify('Prato já está em produção!', 'warning');
            return;
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
