import {Component, ViewChild} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {Location} from "@angular/common";
import notify from "devextreme/ui/notify";


@Component({
    selector: 'relatorio-produtos-estoque',
    templateUrl: './relatorio-receita-despesas-component.html',
    styleUrls: [
        '../../../shared/components/abstract-list/abstract-list.component.css',
        '../../../shared/components/abstract-form/abstract-form.component.scss'
    ]
})
export class RelatorioReceitaDespesasComponent {
    @ViewChild('relatorioTemplate') relatorioTemplate!: any;


    produtos: any[] = [];
    chopes: any[] = [];
    produtosConsumidosClientes: any[] = [];
    produtosConsumidos: any[] = [];
    comparativoProdutos: any[] = [];
    dataDe: any;
    dataAte: any;
    showTabela = false;

    constructor(private apiService: ApiService,
                private location: Location) {
    }

    listarProdutosConsumidos(params: any) {
        this.apiService.filter('clientes/compras-periodo', params).subscribe(
            response => {
                this.produtosConsumidosClientes = response as any[];
                this.getProdutosConsumidos();
                this.getComparativoProdutos();
            }
        )
    }

    listarProdutos(params: any) {
        this.apiService.filter('produtos/periodo', params).subscribe(
            response => {
                this.showTabela = true;

                (response as any[]).forEach(produto => {
                    produto.estoqueProdutos.forEach((estoqueProduto: any) => {

                        const produtoFind = this.produtos.find(p => p.idProduto == produto.id && p.precoCompra == estoqueProduto.precoCompra);

                        if (produtoFind) {
                            produtoFind.quantidade++;
                            produtoFind.total += estoqueProduto.precoCompra;
                        } else {
                            this.produtos.push({
                                nome: produto.nome,
                                precoCompra: estoqueProduto.precoCompra,
                                id: produto.nome + produto.preco,
                                idProduto: produto.id,
                                quantidade: 1,
                                total: estoqueProduto.precoCompra
                            })
                        }

                        this.getComparativoProdutos();
                    })
                });
            }
        )
    }

    listarChopes(params: any) {
        this.apiService.filter('chopes/periodo', params).subscribe(
            response => {
                this.showTabela = true;
                this.chopes = response as any[];
                this.getComparativoProdutos();
            }
        )
    }

    getProdutosConsumidos() {
        if (this.produtosConsumidosClientes.length > 0) {
            this.produtosConsumidosClientes.forEach(cliente => {
                cliente.itensConsumidos.forEach((produto: any) => {
                    if (produto.chope != null) {
                        const produtoFind = this.produtosConsumidos.find(p => p.id == produto.chope.id);
                        if (produtoFind) {
                            produtoFind.preco += produto.chope.precoVenda;
                            produtoFind.quantidade++;
                        } else {
                            this.produtosConsumidos.push({
                                id: produto.chope.id,
                                nome: produto.chope.nome,
                                quantidade: 1,
                                preco: produto.chope.precoVenda,
                            })
                        }
                    } else {
                        const produtoFind = this.produtosConsumidos.find(p => p.id == 'self');
                        if (produtoFind) {
                            produtoFind.preco += produto.preco;
                            produtoFind.quantidade++;
                        } else {
                            this.produtosConsumidos.push({
                                id: 'self',
                                nome: produto.nome,
                                quantidade: 1,
                                preco: produto.preco,
                            })
                        }
                    }
                })
            })
        }
    }

    filtrarRelatorio() {
        if (!this.dataDe || !this.dataAte) {
            notify('Data de e Data Até são obrigatórios', 'error');
            return;
        }
        if (this.dataDe.getTime() > this.dataAte.getTime()) {
            notify('Data de não pode ser maior que data até', 'error');
            return;
        }

        this.dataAte.setHours(23, 59, 59, 999);

        const params = {
            dataDe: this.dataDe.toLocaleString(),
            dataAte: this.dataAte.toLocaleString()
        };

        this.listarProdutos(params);
        this.listarChopes(params);
        this.listarProdutosConsumidos(params);
    }

    showCpfFormated(evt: any) {
        return evt.cliente.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    }

    getComparativoProdutos(){
        if(
            this.produtosConsumidos.length > 0
            && this.produtos.length > 0
            && this.chopes.length > 0
        ){
            const barrisChopesComprados: any[] = [];
            // juntar todos chopes em um preço total
            this.chopes.forEach(chope => {
                const chopeFind = barrisChopesComprados.find(c => c.id == chope.chope.id);
                if(chopeFind){
                    chopeFind.precoTotal += chope.precoTotal;
                } else {
                    barrisChopesComprados.push({
                        id: chope.chope.id,
                        nome: chope.chope.nome,
                        precoTotal: chope.precoTotal,
                    })
                }
            })

            this.produtosConsumidos.forEach(produtoConsumido => {
                if(produtoConsumido.id != 'self'){
                    const chopeFind = barrisChopesComprados.find(c => c.id == produtoConsumido.id);
                    if(chopeFind){
                        this.comparativoProdutos.push({
                            id: chopeFind.id,
                            nome: chopeFind.nome,
                            totalComprado: chopeFind.precoTotal,
                            totalVendido: produtoConsumido.preco
                        })
                    } else {
                        //não comprou chope no periodo mas vendeu
                        this.comparativoProdutos.push({
                            id: produtoConsumido.id,
                            nome: produtoConsumido.nome,
                            totalComprado: 0,
                            totalVendido: produtoConsumido.preco
                        })
                    }
                } else {
                    // self service
                    this.comparativoProdutos.push({
                        id: produtoConsumido.id,
                        nome: produtoConsumido.nome,
                        totalComprado: 0,
                        totalVendido: produtoConsumido.preco
                    })
                }
            })

            let totalProdutosCozinha = 0;
            this.produtos.forEach(produtoCozinha => {
                totalProdutosCozinha+= produtoCozinha.total;
            })

            this.comparativoProdutos.push({
                id: 'cozinha',
                nome: 'Produtos da cozinha',
                totalComprado: totalProdutosCozinha,
                totalVendido: 0
            })

            let totalComprado = 0;
            let totalVendido = 0;

            this.comparativoProdutos.forEach(comparativo => {
                totalComprado += comparativo.totalComprado;
                totalVendido += comparativo.totalVendido;
            })

            const labelTotalComprado = `<span class="badge bg-danger">${this.numberToReal(totalComprado)}</span>`;
            const labelTotalVendido = `<span class="badge bg-success">${this.numberToReal(totalVendido)}</span>`;

            this.comparativoProdutos.push({
                id: 'total',
                nome: 'Total',
                totalComprado: labelTotalComprado,
                totalVendido: labelTotalVendido
            })

        }
    }

    formatTotalComprado = (container: any, options: any) => {
        if(options.data.id != 'total'){
            container.innerHTML = this.numberToReal(options.data.totalComprado);
        } else {
            container.innerHTML = options.data.totalComprado;
        }
    }

    formatTotalVendido = (container: any, options: any) => {
        if(options.data.id != 'total'){
            container.innerHTML = this.numberToReal(options.data.totalVendido);
        } else {
            container.innerHTML = options.data.totalVendido;
        }
    }

    formatStringNome =  (container: any, options: any) => {
        if(options.data.id != 'total'){
            container.innerHTML = options.data.nome;
        } else {
            container.innerHTML = `<strong>${options.data.nome}</strong>`;
        }
    }

    numberToReal(numero: number){
        console.log(numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    open() {
        const htmlRelatorio = this.relatorioTemplate.nativeElement;
        const mywindow = window.open('', 'PRINT', 'height=800,width=800');

        const head = mywindow?.document.head;
        const links = document.querySelectorAll('link[rel="stylesheet"]');

        links.forEach((link: any) => {
            const newLink = mywindow?.document.createElement('link');
            newLink?.setAttribute('rel', 'stylesheet');
            newLink?.setAttribute('href', link.href);
            head?.appendChild(newLink!);
        });

        const styles = document.querySelectorAll('style');
        styles.forEach((style: any) => {
            const newStyle = mywindow?.document.createElement('style');
            newStyle!.textContent = style.textContent;
            const styleClone = style.cloneNode(true);
            head?.appendChild(styleClone!);
        });


        const clone = htmlRelatorio.cloneNode(true);
        mywindow?.document.body.appendChild(clone);


        setTimeout(() => {
            mywindow?.document.close();
            mywindow?.focus();

            mywindow?.print();
            mywindow?.close();
        }, 500);
    }


    public back() {
        this.location.back();
    }
}
