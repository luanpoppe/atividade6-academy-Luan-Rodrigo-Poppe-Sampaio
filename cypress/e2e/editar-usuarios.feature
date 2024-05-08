# language: pt

Funcionalidade: Edição de usuário

    Contexto: Acesso a página de detalhes de um usuário
        Dado que existe um usuário
        Quando acesso a página de detalhes deste usuário
    
    Cenário: Inicialmente os campos de id, nome e email devem estar desabilitados
        Então os campos de id, nome e email devem existir e estar desabilitados

    Cenário: Inicialmente o botão de Salvar deve estar desabilitado e o botão de editar deve estar habilitado
        Então o botão de Salvar deve estar desabilitado e o botão de editar deve estar habilitado

    Cenário: Clicar no botão de editar deve habilitar os campos de nome e email, mas não o de ID
        E clico no botão de editar
        Então os campos de nome e email devem ficar habilitados
        E o campo de ID deve continuar desabilitado

    Cenário: Clicar no botão de editar faz com que o botão de salvar se torne habilitado
        E clico no botão de editar
        Então o botão de salvar se torna habilitado

    Cenário: Clicar no botão de editar faz com que o texto de seu botão mude para "Cancelar"
        E clico no botão de editar
        Então o botão de editar se torna um botão de cancelar
        E este botão de cancelar deve estar habilitado

    Cenário: Clicar no botão de cancelar faz com que os campos de nome e id voltem a ficar desabilitados
        E clico no botão de editar
        Quando clico no botão de "Cancelar"
        Então os campos de nome e email voltam a ficar desabilitados

    Cenário: Clicar no botão de cancelar faz com que o botão de salvar volte a ficar desabilitado
        E clico no botão de editar
        Quando clico no botão de "Cancelar"
        Então o botão de salvar volta a ficar desabilitado

    Cenário: Clicar no botão de cancelar faz com que o texto de seu botão volte a ser "Editar"
        E clico no botão de editar
        Quando clico no botão de "Cancelar"
        Então o texto deste botão voltar a ser "Editar"

    Cenário: Deve ser possível editar as informações de um usuário
        E clico no botão de editar
        E que modifiquei os valores dos campos de nome e email
        Quando clico no botão de salvar
        Então os novos valores devem ser enviados à API
        E deve aparecer a mensagem de sucesso na página "Informações atualizadas com sucesso!"
        E o usuário deve ser redirecionado à página inicial do site
    
    Cenário: Após editar as informações de usuário, a página de detalhes do usuário deve mostrar as novas informações corretamente
        E clico no botão de editar
        E que modifiquei os valores dos campos de nome e email
        Quando clico no botão de salvar
        E retorno à página de detalhes do usuário
        Então as informações de nome e email devem estar atualizadas conforme a edição realizada