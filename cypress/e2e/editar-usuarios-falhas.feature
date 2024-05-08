# language: pt

Funcionalidade: Validações da edição de usuário

    Contexto:
            Dado que existe um usuário
            E que acessei a página de detalhes deste usuário

    Cenário: Não deve ser possível editar usuário sem um nome nem email
        E que cliquei no botão de editar
        Quando deixo os campos de email e nome em branco
        E clico no botão de salvar
        Então deve aparecer as mensagens informando que os campos de nome e email são obrigatório
        E não deve ser feita uma requisição à API

    Cenário: Não deve ser possível editar usuário sem passar um valor no campo de nome
        E que cliquei no botão de editar
        Quando deixo o campo de nome vazio
        E clico no botão de salvar
        Então deve aparecer uma mensagem informando que o campo de nome é obrigatório
        E não deve ser feita uma requisição à API

    Cenário: Não deve ser possível editar usuário passando um nome com menos de 04 caracteres
        E que cliquei no botão de editar
        Quando passo um nome contendo menos de 4 caracteres no campo de nome
        E clico no botão de salvar
        Então deve aparecer a mensagem "Informe pelo menos 4 letras para o nome."
        E não deve ser feita uma requisição à API

    Cenário: Não deve ser possível editar usuário passando um nome com mais de 100 caracteres
        E que cliquei no botão de editar
        Quando passo um nome contendo mais de 100 caracteres no campo de nome
        E clico no botão de salvar
        Então deve aparecer a mensagem "Informe no máximo 100 caracteres para o nome"
        E não deve ser feita uma requisição à API

    Cenário: Não deve ser possível editar usuário passando números no campo de nome
        E que cliquei no botão de editar
        Quando passo um nome contendo números no campo de nome
        E clico no botão de salvar
        Então deve aparecer a mensagem "Formato do nome é inválido."
        E não deve ser feita uma requisição à API

    Cenário: Não deve ser possível editar usuário passando símbolos no campo de nome
        E que cliquei no botão de editar
        Quando passo um nome contendo símbolos no campo de nome
        E clico no botão de salvar
        Então deve aparecer a mensagem "Formato do nome é inválido."
        E não deve ser feita uma requisição à API

    Cenário: Não deve ser possível editar usuário sem passar nada no campo de email
        E que cliquei no botão de editar
        Quando passo deixo o campo de email vazio
        E clico no botão de salvar
        Então deve aparecer a mensagem "O campo e-mail é obrigatório."
        E não deve ser feita uma requisição à API

    Cenário: Não deve ser possível editar usuário passando um email com mais de 60 caracteres
        E que cliquei no botão de editar
        Quando passo um email com mais de 60 caracteres para o campo de email
        E clico no botão de salvar
        Então deve aparecer a mensagem "Informe no máximo 60 caracteres para o e-mail"
        E não deve ser feita uma requisição à API

    Cenário: Não deve ser possível editar usuário sem passar o caractere @ no campo de email
        E que cliquei no botão de editar
        Quando passo um email sem conter o @ para o campo de email
        E clico no botão de salvar
        Então deve aparecer a mensagem "Formato de e-mail inválido"
        E não deve ser feita uma requisição à API

    Cenário: Não deve ser possível editar usuário sem escrever caracteres após o @
        E que cliquei no botão de editar
        Quando passo um email sem caracteres após o símbolo de @ para o campo de email
        E clico no botão de salvar
        Então deve aparecer a mensagem "Formato de e-mail inválido"
        E não deve ser feita uma requisição à API

    Cenário: Não deve ser possível editar usuário com um email sem conter o ".com" ou ".*" ao final
        E que cliquei no botão de editar
        Quando passo um email sem conter o ".com" ou ".*" ao final
        E clico no botão de salvar
        Então deve aparecer a mensagem "Formato de e-mail inválido"
        E não deve ser feita uma requisição à API

    @emailJaExistente
    Cenário: Não deve ser possível editar um usuário com um email previamente cadastrado
        E que eu tenha o email de outro usuário que já existe
        E que cliquei no botão de editar
        Quando passo o email do outro usuário já existente para o campo de email
        E clico no botão de salvar
        Então deve aparecer uma modal com o título sendo "Erro"
        E a modal deve conter um botão de cancelar
        E a modal deve conter um botão com um x
        E deve aparecer a mensagem "Este e-mail já é utilizado por outro usuário."

    @emailJaExistente
    Cenário: O botão de cancelar na modal que informa que já existe um usuário cadastrado com o email em questão deve fechar a modal ao ser clicado
        E que eu tenha o email de outro usuário que já existe
        E que cliquei no botão de editar
        Quando passo o email do outro usuário já existente para o campo de email
        E clico no botão de salvar
        E clico no botão de cancelar da modal de erro
        Então a modal deve ser fechada
        E devo continuar na página de detalhes do usuário sendo editado

    @emailJaExistente
    Cenário: O botão de "x" no canto da modal que informa que já existe um usuário cadastrado com o email em questão deve fechar a modal ao ser clicado
        E que eu tenha o email de outro usuário que já existe
        E que cliquei no botão de editar
        Quando passo o email do outro usuário já existente para o campo de email
        E clico no botão de salvar
        E clico no botão de "x" da modal de erro
        Então a modal deve ser fechada
        E devo continuar na página de detalhes do usuário sendo editado

    @emailJaExistente
    Cenário: Os campos de nome e email não devem ter seus valores resetados ao tentar editar um usuário com email já existente
        E que eu tenha o email de outro usuário que já existe
        E que cliquei no botão de editar
        Quando passo o email do outro usuário já existente para o campo de email
        E clico no botão de salvar
        Então o campo de nome não deve ter seu valor resetado
        E o campo de email não deve ter seu valor resetado

    @emailJaExistente
    Cenário: O botão de salvar deve continuar habilitado após tentar cadastrar um usuário com email já existente e fechar a modal de erro
        E que eu tenha o email de outro usuário que já existe
        E que cliquei no botão de editar
        Quando passo o email do outro usuário já existente para o campo de email
        E clico no botão de salvar
        E clico no botão de "x" da modal de erro
        Então o botão de salvar deve estar habilitado

    @emailJaExistente
    Cenário: A mensagem da API após tentar editar um usuário com um email já existente deve estar correta
        E que eu tenha o email de outro usuário que já existe
        E que cliquei no botão de editar
        Quando passo o email do outro usuário já existente para o campo de email
        E clico no botão de salvar
        Então a mensagem da API deve dizer corretamente que o usuário já existe