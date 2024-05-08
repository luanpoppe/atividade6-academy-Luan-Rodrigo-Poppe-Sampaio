# language: pt

Funcionalidade: Listar usuários

    Cenário: Acesso à página inicial com 06 usuários cadastrados deve mostrar as informações condizentes
        Dado que há 6 usuários cadastrados
        Quando visito a página inicial
        Então ao acessar a página de usuários o total de páginas deverá ser 01
        E botões de avançar e voltar página devem estar desabilitados
        E o total de usuário na página deve ser 06
        E todos os usuários devem mostrar suas devidas informações corretas
    
    Cenário: Acesso à página inicial com 18 usuários cadastrados deve mostrar as informações condizentes
        Dado que há 18 usuários cadastrados
        Quando visito a página inicial
        Então o total de páginas deve ser 03
        E botão de avançar página deve estar habilitado, e o de voltar deve estar desabilitado
        E o total de usuário na página deve ser 06
    
    Cenário: Acesso à página inicial com 03 usuários cadastrados deve mostrar as informações condizentes
        Dado que há 3 usuários cadastrados
        Quando visito a página inicial
        Então ao acessar a página de usuários o total de páginas deverá ser 01
        E botões de avançar e voltar página devem estar desabilitados
        E o total de usuário na página deve ser 03
    
    Cenário: Acesso à página inicial com nenhum usuário cadastrado deve mostrar as informações condizentes
        Dado que não há usuários cadastrados
        Quando visito a página inicial
        Então a página deverá ter um título com o texto "Ops! Não existe nenhum usuário para ser exibido."
        E a página deverá ter um botão com o texto "Cadastre um novo usuário"
        E a página não deverá ter informações sobre usuários
        E o botão de cadastrar usuário deverá redirecionar à URL correta
    
    @testeComBotoes
    Cenário: Botão de avançar página deve funcionar corretamente
        Dado que há mais de 06 usuários cadastrados
        Quando visito a página inicial
        E clico no botão de avançar página
        Então o site deverá ir para a página 02
        E o site deverá mostrar as informações corretas dos usuários da página 02

    @testeComBotoes
    Cenário: Ao clicar duas vezes no botão de avançar, deverá ser mostrado a página 03
        Dado que há mais de 06 usuários cadastrados
        Quando visito a página inicial
        E clico no botão de avançar página 02 vezes
        Então o site deverá ir para a página 03
        E o botão de avançar deverá ficar desabilitado
        E o site deverá mostrar as informações corretas dos usuários da página 03
    
    @testeComBotoes
    Cenário: Botão de voltar página deve funcionar corretamente
        Dado que há mais de 06 usuários cadastrados
        Quando visito a página inicial
        E acesso a página 02
        E clico no botão de voltar página
        Então o usuário deverá estar na página 01
        E o botão de voltar deverá estar desabilitado
        E os usuários mostrados deverão ser os corretos da página 01
    
    Cenário: Botão de Home do header do site deve redirecionar à página inicial
        Quando visito a página inicial
        E clico no botão de home do header
        Então devo ser redirecionado à página inicial

    Cenário: Botão de cadastrar novo usuário do header do site deve redirecionar à página de cadastrar usuários
        Quando visito a página inicial
        E clico no botão de cadastrar novo usuário do header do site
        Então devo ser redirecionado à página de cadastrar usuários