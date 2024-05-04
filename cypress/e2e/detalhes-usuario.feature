# language: pt

Funcionalidade: Acessar página de detalhes de um usuário
    
    @@deletarUsuario
    Cenário: Ver detalhes de um usuário existente
        Dado que visitei a página inicial
        E que tenho as informações de um usuário existente
        E que este usuário aparece na listagem de usuários
        Quando clico no botão de ver detalhes do usuário
        Então devo ser redirecionado para a página de informações do usuário
        E esta página deverá mostrar o id, nome e email corretos do usuário
    
    Cenário: Tentar acessar a página de detalhes de um usuário não existente
        Dado que tentei acessar a página terminando com "/users/idNaoExistente"
        Então deve aparecer uma modal na tela com o título "Usuário não encontrado" e um texto "Não foi possível localizar o usuário."
        E a modal deverá ter um botão cujo texto seja "Cancelar" e um botão com um x para fechar o modal
        E os valores da página por baixo da modal deverão ser valores vazios

    Cenário: Modal de "Usuário não encontrado" não deve ser fechada ao clicar fora dela
        Dado que tentei acessar a página terminando com "/users/idNaoExistente"
        Quando tento clicar num local fora da modal
        Então a modal não deverá ser fechada

    Cenário: Modal de "Usuário não encontrado" deve ser fechada ao clicar no botão de cancelar
        Dado que tentei acessar a página terminando com "/users/idNaoExistente"
        Quando clico no botão de cancelar
        Então devo ser redirecionado para a página inicial

    Cenário: Modal de "Usuário não encontrado" deve ser fechada ao clicar no botão de "x" na extremidade do modal
        Dado que tentei acessar a página terminando com "/users/idNaoExistente"
        Quando clico no botão de "x"
        Então devo ser redirecionado para a página inicial


