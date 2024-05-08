export class CriarUsuario {
    inputNome = "#name"
    inputEmail = "#email"
    buttonSalvar = "button[type='submit']"

    buttonHome = "[href='/']"
    buttonVoltar = "[href='/users']"

    clicarBotaoSalvar() {
        cy.get(this.buttonSalvar).click()
    }
}