import {Component} from '@angular/core';
import {AbstractFormComponent} from "../../shared/components/abstract-form/abstract-form.component";
import notify from "devextreme/ui/notify";
import {ApiService} from "../../shared/services/api.service";

@Component({
    templateUrl: './pesagem-prato.component.html',
    styleUrls: ['../../shared/components/abstract-form/abstract-form.component.scss']
})
export class PesagemPratoComponent {
    precoSelfService: any = 0;
    cartaoCliente: any = '';
    nomeCliente: any = '';
    totalPagar: any = 0;
    pesoPrato: any = 0;
    isLoadPanelVisible = false;


    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getPrecoSelfService();
    }

    private getPrecoSelfService() {
        this.isLoadPanelVisible = true;
        this.apiService.get('self-service').subscribe(
            (response: any) => {
                this.isLoadPanelVisible = false;
                this.precoSelfService = response['preco'];
            }, () => {
                this.isLoadPanelVisible = false;
            }
        );
    }


    salvar() {
        this.isLoadPanelVisible = true;

    }

    showAdicionarCartaoCliente(){
        if(this.cartaoCliente != "" && this.nomeCliente != "" && this.totalPagar > 0) return true;
        return false;
    }
}
