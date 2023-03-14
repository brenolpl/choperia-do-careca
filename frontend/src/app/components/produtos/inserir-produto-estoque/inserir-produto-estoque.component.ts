import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {Location} from "@angular/common";
import {DxDataGridComponent} from "devextreme-angular";
import notify from "devextreme/ui/notify";

interface Produto {
    id: number,
    nome: string,
    codigoBarras: string,
    quantidadeEstoque: number
}

@Component({
    templateUrl: './inserir-produto-estoque.component.html',
    styleUrls: [
        '../../../shared/components/abstract-list/abstract-list.component.css',
        '../../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class InserirProdutoEstoqueComponent {
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid!: DxDataGridComponent;
    codigoBarras: string = "";
    produtosSelecionados: Produto[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private location: Location
    ) {}

    back() {
        this.location.back();
    }

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
                this.produtosSelecionados.push({
                    id: produto.id,
                    nome: produto.nome,
                    quantidadeEstoque: 1,
                    codigoBarras: produto.codigoBarras
                })
            } else {
                produtoSelecionado.quantidadeEstoque ++;
            }
        }

        this.codigoBarras = "";
    }

    salvar() {
        this.apiService.post('produtos/adicionar-estoque', this.produtosSelecionados).subscribe(
            response => {
                notify("Produtos adicionados ao estoque com sucesso!", "success");
                this.back();
            }
        )
    }

}
