import {Component, ViewChild} from '@angular/core';
import {AbstractFormComponent} from "../../../shared/components/abstract-form/abstract-form.component";
import {DxFormComponent, DxSelectBoxComponent} from "devextreme-angular";
import notify from "devextreme/ui/notify";

interface TipoUsuario {
    nome: string,
    id: number
}

@Component({
    selector: 'app-form-usuarios',
    templateUrl: './form-funcionarios.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class FormFuncionariosComponent extends AbstractFormComponent {
    tipoUsuarios: TipoUsuario[] = [];
    tipoSelecionado: any;

    @ViewChild('selectTipos', {static: false}) selectTipos!: DxSelectBoxComponent;

    override ngOnInit() {
        super.ngOnInit();
        this.listarTiposUsuarios();
    }

    override detalharEntidade(id: string) {
        this.apiService.detail(this.getRota(), id).subscribe(
            response => {
                this.entidade = response;
                // this.listarTiposUsuarios();
            }
        );
    }

    protected getRota(): string {
        return 'usuarios';
    }

    listarTiposUsuarios(){
        this.apiService.get('usuarios/tipos').subscribe(
            response => {
                (response as TipoUsuario[]).forEach(tipo => {
                    this.tipoUsuarios.push({
                        id: tipo.id,
                        nome: tipo.nome
                    })
                })

                if(this.entidade?.tipoUsuario){
                    this.tipoSelecionado = this.entidade.tipoUsuario.id;
                }
            }
        )
    }

    getTipoUsuarioSelecionado = () => {
        const nome = this.selectTipos.instance.option('displayValue');
        const id = this.selectTipos.instance.option('value');
        if(!nome || !id){
            notify('Selecione um tipo de usuário', 'error');
            throw new Error('Selecione um tipo de usuário');
        }
        return {nome, id};
    }

    override getEntidade(){
        const form = super.getEntidade();
        form['tipoUsuario'] = this.getTipoUsuarioSelecionado();
        return form;
    }
}
