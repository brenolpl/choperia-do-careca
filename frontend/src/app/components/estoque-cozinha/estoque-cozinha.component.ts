import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../shared/services/api.service";
import {Location} from "@angular/common";
import {DxDataGridComponent} from "devextreme-angular";
import notify from "devextreme/ui/notify";

interface Produto {
    id: number,
    nome: string,
    codigoBarras: string,
    quantidadeEstoque: number,
    quantidadeRemover: number
}

@Component({
    templateUrl: './estoque-cozinha.component.html',
    styleUrls: [
        '../../shared/components/abstract-list/abstract-list.component.css',
        '../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class EstoqueCozinhaComponent {
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid!: DxDataGridComponent;
    codigoBarras: string = "";
    produtosSelecionados: Produto[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService
    ) {}

    async getProdutoByCodigoBarras(codigo: string){
        return this.apiService.detail('produtos/codigo-barras', codigo).toPromise();
    }

    adicionarProduto = async () => {
        if(this.codigoBarras.length < 13) {
            this.codigoBarras = "";
            return;
        }

        const produto: Produto = await this.getProdutoByCodigoBarras(this.codigoBarras) as Produto;

        if(produto){
            const produtoSelecionado = this.produtosSelecionados.find(p => p.codigoBarras == produto.codigoBarras);
            if(!produtoSelecionado){
                if(produto.quantidadeEstoque < 1){
                    notify('Não há estoque do item informado.', 'error');
                    return;
                } else {
                    this.produtosSelecionados.push({
                        id: produto.id,
                        nome: produto.nome,
                        quantidadeEstoque: produto.quantidadeEstoque,
                        codigoBarras: produto.codigoBarras,
                        quantidadeRemover: 1
                    })
                }
            } else {
                if(produtoSelecionado.quantidadeEstoque < produtoSelecionado.quantidadeRemover + 1){
                    notify('Não é possível remover mais itens do que tem em estoque', 'error');
                } else {
                    produtoSelecionado.quantidadeRemover ++;
                }
            }
        }

        this.codigoBarras = "";
    }

    salvar() {
        this.apiService.post('produtos/remover-estoque', this.produtosSelecionados).subscribe(
            () => {
                notify("Produtos removidos do estoque com sucesso!", "success");
                this.produtosSelecionados = [];
            }
        )
    }

}
