import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent, DxFormComponent} from "devextreme-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {confirm} from "devextreme/ui/dialog";
import {ApiService} from "../../services/api.service";
import notify from "devextreme/ui/notify";
import {Location} from "@angular/common";

@Component({
    template: '',
    styleUrls: ['./abstract-form.component.scss']
})
export abstract class AbstractFormComponent implements OnInit {
    @ViewChild('formulario', {static: false}) formulario!: DxFormComponent;
    entidade: any = {};

    labelLocation = 'left';
    routeSubscription: any;
    isLoadPanelVisible: any = false;

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

    protected detalharEntidade(id: string) {
        this.apiService.detail(this.getRota(), id).subscribe(
            response => {
                this.entidade = response;
            }
        );
    }

    onSalvar = (button: any) => {
        this.salvar(button);
    }

    protected getEntidade(){
        return this.formulario.instance.option('formData');
    }

    protected validateFormulario(){
        return this.formulario.instance.validate().isValid;
    }

    protected salvar(button: any){
        const formValidator = this.validateFormulario();
        const formData = this.getEntidade();

        this.isLoadPanelVisible = true;

        if (formValidator) {
            if (this.entidade.id || this.entidade.codigo) {
                this.apiService.patch(this.getRota(), formData['id'], formData).subscribe(
                    (response: any) => {
                        this.isLoadPanelVisible = false;
                        notify('Alterado com sucesso!', 'success', 2000);
                    }, () => this.erroSalvarAlterar()
                );
            } else {
                this.apiService.post(this.getRota(), formData).subscribe(
                    (response: any) => {
                        this.isLoadPanelVisible = false;
                        notify('Criado com sucesso!', 'success', 2000);
                        this.navigateEdit(response['id']);
                    }, () => this.erroSalvarAlterar()
                );
            }
        } else {
            this.isLoadPanelVisible = false;
        }
    }

    public erroSalvarAlterar(){
        this.isLoadPanelVisible = false;
        notify('Ocorreu um erro ao salvar', 'error');
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

    public excluirVisible(): boolean{
        return this.entidade.id != null || this.entidade.codigo != null;
    }
}
