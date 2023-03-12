import {Component} from '@angular/core';
import {AbstractFormComponent} from "../../../shared/components/abstract-form/abstract-form.component";
import notify from "devextreme/ui/notify";

@Component({
    templateUrl: './form-produto.component.html',
    styleUrls: ['../../../shared/components/abstract-form/abstract-form.component.scss']
})
export class FormProdutoComponent extends AbstractFormComponent {
    protected getRota(): string {
        return 'produtos';
    }


    override salvar = () => {
        const formData = this.formulario.instance.option('formData');

        if(formData.codigoBarras && formData.codigoBarras.length < 13){
            notify('Se for informar código de barras, o mesmo precisa conter 13 digitos, caso contrário não informe o código e deixe que o sistema gere para você.', 'error', 4000);
            return;
        } else if(formData.codigoBarras){
            if(!this.validarCodigoBarras(formData.codigoBarras)) return;
        }
        super.salvar();
    }

    validarCodigoBarras(codigo: any): boolean {
        if (codigo.length !== 13) {
            return false;
        }

        // Calcula o dígito verificador
        let soma = 0;
        for (let i = 0; i < 12; i += 2) {
            soma += parseInt(codigo.charAt(i));
        }
        soma *= 3;
        for (let i = 1; i < 12; i += 2) {
            soma += parseInt(codigo.charAt(i));
        }
        let dv = (10 - (soma % 10)) % 10;

        // Verifica se o dígito verificador é igual ao último dígito do código
        if(!(dv === parseInt(codigo.charAt(12)))){
            notify('Código de barras inválido.', 'error', 4000);
            return false;
        }
        return true;
    }
}
