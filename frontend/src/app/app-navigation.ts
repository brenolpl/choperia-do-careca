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
        text: 'Estoque cozinha',
        icon: 'food',
    },
    {
        text: 'Pratos faltantes',
        icon: 'food',
    },
    {
        text: 'Estoque self-service',
        icon: 'food',
    },
    {
        text: 'Pesagem de prato',
        icon: 'food',
    },
    {
        text: 'Fechamento de pedido',
        icon: 'cart',
        path: 'fechamento-pedido'
    },
    {
        text: 'Vincular cartão',
        icon: 'card',
    },
    {
        text: 'Estoque de chope',
        icon: 'coffee',
        path: 'chopes'
    },
    {
        text: 'Saída',
        icon: 'runner',
    },
    {
        text: 'Relatórios',
        icon: 'textdocument',
    },
    {
        text: 'Cartao RFID',
        icon: 'card',
        path: 'cartao-rfid'
    }
];
