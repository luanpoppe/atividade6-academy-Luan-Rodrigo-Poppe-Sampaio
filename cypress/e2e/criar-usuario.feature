# language: pt

Funcionalidade: Criar usuários
    
    Cenário: Botão de voltar do header funciona como esperado
        Dado que visitei a página de cadastrar usuários
        Quando clico no botão de voltar do header
        Então o usuário deverá ser redirecionado à página inicial do site
    
    Cenário: Mensagem de sucesso deve aparecer após cadastrar um usuário corretamente
        Dado que visitei a página de cadastrar usuários
        Quando digito um usuário válido no campo de nome e de email
        E clico no botão de cadastrar
        Então Deverá aparecer uma mensagem na tela com o texto "Usuário salvo com sucesso!"

    Cenário: Usuário cadsatrado existe no banco de dados
        Dado que visitei a página de cadastrar usuários
        Quando realizo o cadastro de um usuário pelo site
        E faço uma consulta à API pelos usuários cadastrados
        Então o usuário criado deverá estar presente no retorno da API

    Cenário: Campos de nome e email devem ter seus valores resetados após um cadastro com sucesso
        Dado que visitei a página de cadastrar usuários
        Quando realizo o cadastro de um usuário pelo site
        Então os campos de nome e email devem ter seus valores resetados

    Cenário: Botão de salvar deve ficar desabilitado durante a requisição
        Dado que visitei a página de cadastrar usuários
        Quando digito um usuário válido no campo de nome e de email
        E clico no botão de cadastrar
        Então o botão de cadastrar deverá ficar desabilitado até o cadastro terminar

    Cenário: Cadastrar um usuário com o nome contendo 100 caracteres deve ser aceito
        Dado que visitei a página de cadastrar usuários
        Quando digito um email válido e um nome com 100 caracteres
        E clico no botão de cadastrar
        Então o usuário deve ser cadastrado com sucesso
    
    Cenário: Cadastrar um usuário com o nome contendo 04 caracteres deve ser aceito
        Dado que visitei a página de cadastrar usuários
        Quando digito um email válido e um nome com 4 caracteres
        E clico no botão de cadastrar
        Então o usuário deve ser cadastrado com sucesso

    Cenário: Cadastrar um usuário com um email com 60 caracteres deve ser aceito
        Dado que visitei a página de cadastrar usuários
        Quando digito um nome válido e um email com 60 caracteres
        E clico no botão de cadastrar
        Então o usuário deve ser cadastrado com sucesso