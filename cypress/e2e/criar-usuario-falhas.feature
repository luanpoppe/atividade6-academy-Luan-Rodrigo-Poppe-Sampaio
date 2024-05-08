# language: pt

Funcionalidade: Validação ao criar usuários

    Contexto: Acessar a página de cadastro de usuários
        Dado que acessei a página de cadastrar usuários
    
    Cenário: Não deve ser possível cadastrar usuário sem um nome nem email
        E que não digito nada no campo de nome e no de email
        Quando clico no botão de cadastrar usuário
        Então deve aparecer as mensagens informando que os campos de nome e email são obrigatórios
        E não deve aparecer uma mensagem de sucesso

    Cenário: Não deve ser possível cadastrar usuário sem passar um valor no campo de nome
        E que digito um email válido
        E que não digito nada no campo de nome
        Quando clico no botão de cadastrar usuário
        Então deve aparecer uma mensagem informando que o campo de nome é obrigatório
        E não deve aparecer uma mensagem de sucesso

    Cenário: Não deve ser possível cadastrar usuário passando um nome com menos de 04 caracteres
        E que digito um email válido
        E que digito um nome com menos de 04 caracteres
        Quando clico no botão de cadastrar usuário
        Então deve aparecer a mensagem "Informe pelo menos 4 letras para o nome."
        E não deve aparecer uma mensagem de sucesso

    Cenário: Não deve ser possível cadastrar usuário passando um nome com mais de 100 caracteres
        E que digito um email válido
        E que digito um nome com mais de 100 caracteres
        Quando clico no botão de cadastrar usuário
        Então deve aparecer a mensagem "Informe no máximo 100 caracteres para o nome"
        E não deve aparecer uma mensagem de sucesso

    Cenário: Não deve ser possível cadastrar usuário passando números no campo de nome
        E que digito um email válido
        E que digito um nome contendo números
        Quando clico no botão de cadastrar usuário
        Então deve aparecer a mensagem "Formato do nome é inválido."
        E não deve aparecer uma mensagem de sucesso

    Cenário: Não deve ser possível cadastrar usuário passando símbolos no campo de nome
        E que digito um email válido
        E que digito um nome contendo símbolos
        Quando clico no botão de cadastrar usuário
        Então deve aparecer a mensagem "Formato do nome é inválido."
        E não deve aparecer uma mensagem de sucesso

    Cenário: Não deve ser possível cadastrar usuário sem passar nada no campo de email
        E que digito um nome válido
        E que não digito nada no campo de email
        Quando clico no botão de cadastrar usuário
        Então deve aparecer a mensagem "O campo e-mail é obrigatório."
        E não deve aparecer uma mensagem de sucesso

    Cenário: Não deve ser possível cadastrar usuário passando um email com mais de 60 caracteres
        E que digito um nome válido
        E que digito um email contendo mais de 60 caracteres
        Quando clico no botão de cadastrar usuário
        Então deve aparecer a mensagem "Informe no máximo 60 caracteres para o e-mail"
        E não deve aparecer uma mensagem de sucesso

    Cenário: Não deve ser possível cadastrar usuário sem passar o caractere @ no campo de email
        E que digito um nome válido
        E que digito um email sem conter o @ no campo de email
        Quando clico no botão de cadastrar usuário
        Então deve aparecer a mensagem "Formato de e-mail inválido"
        E não deve aparecer uma mensagem de sucesso

    Cenário: Não deve ser possível cadastrar usuário sem escrever caracteres após o @
        E que digito um nome válido
        E que digito um email sem caracteres após o símbolo de @
        Quando clico no botão de cadastrar usuário
        Então deve aparecer a mensagem "Formato de e-mail inválido"
        E não deve aparecer uma mensagem de sucesso

    Cenário: Não deve ser possível cadastrar usuário com um email sem conter o ".com" ou ".*" ao final
        E que digito um nome válido
        E que digito um email sem conter o ".com" ou ".*" ao final
        Quando clico no botão de cadastrar usuário
        Então deve aparecer a mensagem "Formato de e-mail inválido"
        E não deve aparecer uma mensagem de sucesso

    @emailJaExistente
    Cenário: Não deve ser possível cadastrar usuário com um email previamente cadastrado
        E que eu tenha o email de um usuário que já existe
        E que digito um nome válido
        E que digito o email do usuário que já existe
        Quando clico no botão de cadastrar usuário
        Então deve aparecer uma modal com o título sendo "Erro"
        E a modal deve conter um botão de cancelar
        E a modal deve conter um botão com um x
        E deve aparecer a mensagem "Este e-mail já é utilizado por outro usuário."

    @emailJaExistente
    Cenário: O botão de cancelar na modal que informa que já existe um usuário cadastrado com o email em questão deve fechar a modal ao ser clicado
        E que eu tenha o email de um usuário que já existe
        E que digito um nome válido
        E que digito o email do usuário que já existe
        Quando clico no botão de cadastrar usuário
        E clico no botão de cancelar da modal de erro
        Então a modal deve ser fechada
        E devo continuar na página de cadastrar novo usuário

    @emailJaExistente
    Cenário: O botão de "x" no canto da modal que informa que já existe um usuário cadastrado com o email em questão deve fechar a modal ao ser clicado
        E que eu tenha o email de um usuário que já existe
        E que digito um nome válido
        E que digito o email do usuário que já existe
        Quando clico no botão de cadastrar usuário
        E clico no botão de "x" da modal de erro
        Então a modal deve ser fechada
        E devo continuar na página de cadastrar novo usuário

    @emailJaExistente
    Cenário: Os campos de nome e email não devem ter seus valores resetados ao tentar cadastrar um usuário com email já existente
        E que eu tenha o email de um usuário que já existe
        E que digito um nome válido
        E que digito o email do usuário que já existe
        Quando clico no botão de cadastrar usuário
        Então o campo de nome não deve ser resetado
        E o campo de email não deve ser resetado

    @emailJaExistente
    Cenário: O botão de salvar deve ficar habilitado após tentar cadastrar um usuário com email já existente e fechar a modal de erro
        E que eu tenha o email de um usuário que já existe
        E que digito um nome válido
        E que digito o email do usuário que já existe
        Quando clico no botão de cadastrar usuário
        E clico no botão de "x" da modal de erro
        Então o botão de salvar deve estar habilitado

    @emailJaExistente
    Cenário: A mensagem da API após tentar cadastrar um usuário com um email já existente deve estar correta
        E que eu tenha o email de um usuário que já existe
        E que digito um nome válido
        E que digito o email do usuário que já existe
        Quando clico no botão de cadastrar usuário
        Então a mensagem da API deve informar corretamente que o usuário já existe