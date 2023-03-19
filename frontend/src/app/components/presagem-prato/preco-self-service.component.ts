import {Component} from '@angular/core';
import {AbstractFormComponent} from "../../shared/components/abstract-form/abstract-form.component";
import notify from "devextreme/ui/notify";

@Component({
    templateUrl: './preco-self-service.component.html',
    styleUrls: ['../../shared/components/abstract-form/abstract-form.component.scss']
})
export class PrecoSelfServiceComponent extends AbstractFormComponent {
    precoSelfService: any;
    idSelfService: any;

    override ngOnInit(): void {
        this.getPrecoSelfService();
    }

    private getPrecoSelfService() {
        this.isLoadPanelVisible = true;
        this.apiService.get('self-service').subscribe(
            (response: any) => {
                this.isLoadPanelVisible = false;
                this.precoSelfService = response['preco'];
                this.idSelfService = response['id'];
            }, () => {
                this.isLoadPanelVisible = false;
            }
        );
    }

    override getEntidade() {
        return {id: this.idSelfService, preco: this.precoSelfService};
    }

    override validateFormulario() {
        if (this.precoSelfService < 0) {
            notify('Preço não pode ser menor que zero', 'error');
            return false;
        } else if (!this.precoSelfService) {
            notify('Informe um preço para o self service', 'error');
        }
        return true;
    }

    override salvar() {
        this.isLoadPanelVisible = true;
        if (this.validateFormulario()) {
            const entidade: any = this.getEntidade();

            this.apiService.patch('self-service', this.idSelfService, entidade).subscribe(
                (response: any) => {
                    this.isLoadPanelVisible = false;
                    this.precoSelfService = response['preco'];
                    this.idSelfService = response['id'];
                }, () => {
                    this.isLoadPanelVisible = false;
                }
            );
        }
    }

    protected getRota(): string {
        return "";
    }

    override back() {
    }
}
