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

    override validateFormulario(){
        const isValid = super.validateFormulario();
        if(!isValid) return false;

        const formData = this.formulario.instance.option('formData');
        if (formData.codigoBarras && formData.codigoBarras.length < 13) {
            notify('Se for informar código de barras, o mesmo precisa conter 13 digitos, caso contrário não informe o código e deixe que o sistema gere para você.', 'error', 4000);
            return false;
        } else if (formData.codigoBarras) {
            if (!this.isCodigoBarrasValido(formData.codigoBarras)) return false;
            return true;
        }
        return true;
    }

    isCodigoBarrasValido(codigo: any): boolean {
        let factor = 3;
        let sum = 0;

        for (let index = codigo.length; index > 0; --index) {
            if (index != 13) {
                sum = sum + codigo.substring(index - 1, index) * factor;
                factor = 4 - factor;
            }
        }
        let cc = ((1000 - sum) % 10);
        let ca = codigo.substring(12);
        if (cc == ca) {
            return true
        } else {
            notify('Código de barras inválido.', 'error', 4000);
            return false;
        }
    }
}
