import {TipoUsuarioEnum} from "./shared/modelos/usuario";

export interface NavigationMenu {
    text: string,
    icon: string,
    path?: string
    permissao?: TipoUsuarioEnum[]
}

export const navigation: NavigationMenu[] = [
    {
        text: 'Produtos',
        path: 'produtos',
        icon: 'tags'
    },
    {
        text: 'Funcionários',
        path: 'usuarios',
        icon: 'user',
    },
    {
        text: 'Clientes',
        path: 'clientes',
        icon: 'user',
    },
    {
        text: 'Preço Self Service',
        icon: 'money',
        path: 'preco-self-service'
    },
    {
        text: 'Pratos Self Service',
        icon: 'food',
        path: 'pratos'
    },
    {
        text: 'Reposição Self Service',
        icon: 'food',
        path: 'reposicao-self-service'
    },
    {
        text: 'Estoque de chope',
        icon: 'coffee',
        path: 'chopes'
    },
    {
        text: 'Cartao RFID',
        icon: 'card',
        path: 'cartao-rfid'
    },
    {
        text: 'Estoque cozinha',
        icon: 'box',
        path: 'estoque-cozinha'
    },
    {
        text: 'Pesagem de prato',
        icon: 'food',
        path: 'pesagem-prato'
    },
    {
        text: 'Associações de Cartão',
        icon: 'attach',
        path: 'associacao-cliente-cartao'
    },
    {
        text: 'Fechamento de Conta',
        icon: 'cart',
        path: 'fechamento-conta'
    }
    // {
    //     text: 'Relatórios',
    //     icon: 'textdocument',
    // },
];
