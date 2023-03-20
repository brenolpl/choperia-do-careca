import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from "devextreme-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {confirm} from "devextreme/ui/dialog";
import {ApiService} from "../../services/api.service";
import notify from "devextreme/ui/notify";

@Component({
    template: '',
    styleUrls: ['./abstract-list.component.css']
})
export abstract class AbstractListComponent implements OnInit {
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid!: DxDataGridComponent;
    entidades: any = [];

    constructor(protected router: Router, protected route: ActivatedRoute, protected apiService: ApiService) {
    }

    ngOnInit(): void {
        this.listarEntidades();
    }

    public editar = (evt: any) => {
        this.router.navigate([evt.row.data['id']], {relativeTo: this.route});
    }

    public excluir = (evt: any) => {
        const entidade = evt.row.data;
        confirm('Tem certeza que deseja excluir? Não será possível desfazer a alteração.', 'Confirmar exclusão').then((confirmExcluir) => {
            if (confirmExcluir) {
                this.apiService.delete(this.getRota(), entidade['id'] !== undefined ? entidade['id'] : entidade['codigo']).subscribe(
                    () => {
                        notify('Excluido com sucesso', 'success', 2000);
                        this.listarEntidades();
                    },
                    () => {
                        notify('Ocorreu um erro ao tentar excluir', 'error', 2000);
                    }
                );
            }
        });
    }

    protected listarEntidades() {
        this.apiService.get(this.getRota()).subscribe(
            response => {
                this.entidades = response as any[];
            }
        )
    }

    onClickNovo() {
        this.router.navigate(['novo'], {relativeTo: this.route});
    }

    protected abstract getRota(): string;
}
