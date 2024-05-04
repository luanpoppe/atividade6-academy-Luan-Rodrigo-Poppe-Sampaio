# language: pt

Funcionalidade: Listar usuários

    Contexto: Acesso à página inicial
        Dado que visitei a página inicial

    Cenário: Acessando página que mostra os usuários com 06 usuários cadastrados
        E que há 06 usuários cadastrados
        Então ao acessar a página /users o total de páginas deverá ser 01
        E botões de avançar e voltar página devem estar desabilitados
        E o total de usuário na página deve ser 06
        E todos os usuários devem mostrar suas devidas informações corretas
    
    Cenário: Acessando página que mostra os usuários com 18 usuários cadastrados
        E que há 18 usuários cadastrados
        Então o total de páginas deve ser 03
        E botão de avançar página deve estar habilitado, e o de voltar deve estar desabilitado
        E o total de usuário na página deve ser 06
    @only
    Cenário: Acessando página que mostra os usuários com 03 usuários cadastrados
        E que há 03 usuários cadastrados
        Então ao acessar a página /users o total de páginas deverá ser 01
        E botões de avançar e voltar página devem estar desabilitados
        E o total de usuário na página deve ser 03

