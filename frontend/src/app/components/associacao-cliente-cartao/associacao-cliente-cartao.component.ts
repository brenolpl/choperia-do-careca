import {Component} from '@angular/core';
import {AbstractListComponent} from "../../shared/components/abstract-list/abstract-list.component";

@Component({
    selector: 'app-associacao-cliente-cartao',
    templateUrl: './associacao-cliente-cartao.component.html',
    styleUrls: ['../../shared/components/abstract-list/abstract-list.component.css']
})
export class AssociacaoClienteCartaoComponent extends AbstractListComponent {

    protected getRota(): string {
        return "associacao-cliente-cartao-rfid";
    }


    protected override listarEntidades() {
        this.apiService.get('associacao-cliente-cartao-rfid/associacoesCorrentes').subscribe(
            (response: any) => {
                this.entidades = response as any[];
            }
        )
    }

    onFecharContasClick() {
        this.router.navigate(['fechar-pedido'], {relativeTo: this.route});
    }

    onHistoricoClick() {
        this.router.navigate(['historico'], {relativeTo: this.route});
    }
}
