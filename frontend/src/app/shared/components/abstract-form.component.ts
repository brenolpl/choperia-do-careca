import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent, DxFormComponent} from "devextreme-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {confirm} from "devextreme/ui/dialog";
import {ApiService} from "../../shared/services/api.service";
import notify from "devextreme/ui/notify";
import {Location} from "@angular/common";

@Component({
    template: '',
})
export abstract class AbstractFormComponent implements OnInit {
    @ViewChild('formulario', {static: false}) formulario!: DxFormComponent;
    entidade: any = null;

    labelLocation = 'left';
    routeSubscription: any;

    constructor(
        protected location: Location,
        protected router: Router,
        protected route: ActivatedRoute,
        protected apiService: ApiService
    ) {
        if (window.innerWidth <= 580) {
            this.labelLocation = 'top';
        }
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.detalharEntidade(id);
        }
    }

    public back() {
        this.location.back();
    }

    private detalharEntidade(id: string) {
        this.apiService.detail(this.getRota(), id).subscribe(
            response => {
                this.entidade = response;
            }
        );
    }

    salvar = () => {
        const formValidator = this.formulario.instance.validate();
        const formData = this.formulario.instance.option('formData');

        if (formValidator.isValid) {
            if (this.entidade) {
                this.apiService.patch(this.getRota(), formData['id'], formData).subscribe(
                    (response: any) => {
                        notify('Alterado com sucesso!', 'success', 2000);
                    }
                );
            } else {
                this.apiService.post(this.getRota(), formData).subscribe(
                    (response: any) => {
                        notify('Criado com sucesso!', 'success', 2000);
                        this.navigateEdit(response['id']);
                    }
                );
            }
        }
    }

    public excluir() {
        confirm('Tem certeza que deseja excluir? Não será possível desfazer a alteração.', 'Confirmar exclusão').then((confirmExcluir) => {
            if (confirmExcluir) {
                this.apiService.delete(this.getRota(), this.entidade['id']).subscribe(
                    () => {
                        this.back();
                    },
                    () => {
                        notify('Ocorreu um erro ao tentar excluir', 'error', 2000);
                    }
                );
            }
        });
    }

    private navigateEdit(id: string): void {
        const route = this.getRota() + "/" + id;
        this.router.navigate([route], {replaceUrl: true});
    }

    protected abstract getRota(): string;
}
