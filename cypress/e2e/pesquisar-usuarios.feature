# language: pt

Funcionalidade: Pesquisa de usuários

    Contexto: Acessar a página inicial
        Dado que acessei a página inicial do site
    
    Cenário: Barra de pesquisa deve existir e estar habilitada
        Então a barra de pesquisa deve existir
        E ela deve estar habilitada
    
    Cenário: Ao digitar algo no campo de busca, uma pesquisa deve ser feita
        Quando faço uma pesquisa utilizando o campo de pesquisa
        Então uma pesquisa deve ser realizada pelo site

    Cenário: Não deve ser feita uma busca à API de pesquisa se nada for digitado no campo de pesquisa
        E não digitei nada no campo de pesquisa
        Então nenhuma busca à API de pesquisa é feita

    Cenário: O botão de resetar valor pesquisado não deve aparecer antes de se pesquisar algo
        E não digitei nada no campo de pesquisa
        Então o botão de resetar o valor pesquisado não deve existir ainda

    Cenário: O botão de resetar valor pesquisado deve aparecer após se pesquisar algo
        Quando faço uma pesquisa utilizando o campo de pesquisa
        Então o botão de resetar o valor pesquisado deve aparecer

    Cenário: O botão de resetar valor pesquisado apagar o valor do campo de pesquisa após ser clicado
        E que fiz uma pesquisa utilizando o campo de pesquisa
        Quando clico no botão de resetar o campo de pesquisa
        Então o valor do campo de pesquisa deverá ser resetado

    Cenário: Uma pesquisa por todos os usuários deve ser realizado após clicar no botão de resetar campo de pesquisa
        E que fiz uma pesquisa utilizando o campo de pesquisa
        Quando clico no botão de resetar o campo de pesquisa
        Então uma pesquisa por todos os usuários deve ser feita

    Cenário: Uma pesquisa por todos os usuários deve ser realizado após apagar manualmente tudo o que foi digitado no campo de pesquisa
        E que fiz uma pesquisa utilizando o campo de pesquisa
        Quando apago manualmente o valor digitado no campo de pesquisa
        Então uma pesquisa por todos os usuários deve ser feita

    Cenário: Pesquisar por um usuário que não existe deve mostrar tela correspondente
        Quando pesquiso por um usuário que tenho certeza que não existe
        Então deverá aparecer a mensagem "Ops! Não existe nenhum usuário para ser exibido." na tela
        E deverá aparecer um botão para cadastrar novo usuário na tela
        E não deve mostrar nenhum usuário cadastrado na tela
        E o botão de novo cadastro botão deve redirecionar à página de cadastrar novo usuário ao ser clicado

    @criacaoDeUsuario
    Cenário: Pesquisar por um nome de um usuário deve trazer o resultado esperado
        Quando pesquiso pelo nome de um usuário que tenho certeza que existe
        Então deverá aparecer na tela informações sobre o usuário pesquisado

    @criacaoDeUsuario
    Cenário: Pesquisar por um email de um usuário deve trazer o resultado esperado
        Quando pesquiso pelo email de um usuário que tenho certeza que existe
        Então deverá aparecer na tela informações sobre o usuário pesquisado pelo email

    @criacaoDeUsuario
    Cenário: Clicar no botão de ver detalhes do usuário que foi criado e pesquisado deve redirecionar à página de detalhes do usuário
        Quando pesquiso pelo email de um usuário que tenho certeza que existe
        E clico no botão de ver detalhes do usuário
        Então deverá abrir a página de detalhes do usuário
        E conter as informações corretas sobre nome, email e id do usuário
