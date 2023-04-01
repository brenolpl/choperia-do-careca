import {TipoUsuarioEnum} from "./shared/modelos/usuario";

export interface NavigationMenu {
    text: string,
    icon: string,
    path?: string
    permissoes?: TipoUsuarioEnum[]
}

export const navigation: NavigationMenu[] = [
    {
        text: 'Produtos',
        path: 'produtos',
        icon: 'tags',
        permissoes: [
            TipoUsuarioEnum.Administrador,
            TipoUsuarioEnum.Fiscal_Estoque
        ]
    },
    {
        text: 'Funcionários',
        path: 'usuarios',
        icon: 'user',
        permissoes: [
            TipoUsuarioEnum.Administrador,
        ]
    },
    {
        text: 'Clientes',
        path: 'clientes',
        icon: 'user',
        permissoes: [
            TipoUsuarioEnum.Administrador,
            TipoUsuarioEnum.Fiscal_Entrada
        ]
    },
    {
        text: 'Preço Self Service',
        icon: 'money',
        path: 'preco-self-service',
        permissoes: [
            TipoUsuarioEnum.Administrador,
        ]
    },
    {
        text: 'Pratos Self Service',
        icon: 'food',
        path: 'pratos',
        permissoes: [
            TipoUsuarioEnum.Administrador,
            TipoUsuarioEnum.Cozinheiro
        ]
    },
    {
        text: 'Reposição Self Service',
        icon: 'food',
        path: 'reposicao-self-service',
        permissoes: [
            TipoUsuarioEnum.Administrador,
            TipoUsuarioEnum.Fiscal_SelfService
        ]
    },
    {
        text: 'Estoque de chope',
        icon: 'coffee',
        path: 'chopes',
        permissoes: [
            TipoUsuarioEnum.Administrador,
            TipoUsuarioEnum.Fiscal_Estoque
        ]
    },
    {
        text: 'Cartao RFID',
        icon: 'card',
        path: 'cartao-rfid',
        permissoes: [
            TipoUsuarioEnum.Administrador,
            TipoUsuarioEnum.Fiscal_Entrada
        ]
    },
    {
        text: 'Estoque cozinha',
        icon: 'box',
        path: 'estoque-cozinha',
        permissoes: [
            TipoUsuarioEnum.Administrador,
        ]
    },
    {
        text: 'Pesagem de prato',
        icon: 'food',
        path: 'pesagem-prato',
        permissoes: [
            TipoUsuarioEnum.Administrador,
        ]
    },
    {
        text: 'Associações de Cartão',
        icon: 'attach',
        path: 'associacao-cliente-cartao',
        permissoes: [
            TipoUsuarioEnum.Administrador,
            TipoUsuarioEnum.Fiscal_Entrada
        ]
    },
    {
        text: 'Fechamento de Conta',
        icon: 'cart',
        path: 'fechamento-conta',
        permissoes: [
            TipoUsuarioEnum.Administrador,
            TipoUsuarioEnum.Caixa
        ]
    },
    {
        text: 'Verificar Saída',
        icon: 'runner',
        path: 'verificar-saida',
        permissoes: [
            TipoUsuarioEnum.Administrador,
            TipoUsuarioEnum.Fiscal_Entrada
        ]
    },
    {
        text: 'Relatórios',
        icon: 'textdocument',
        path: 'relatorios',
        permissoes: [
            TipoUsuarioEnum.Administrador
        ]
    },
];
