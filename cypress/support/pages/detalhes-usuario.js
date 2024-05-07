export class DetalhesUsuario {
    inputId = "input[name='id']"
    inputName = "input[name='name']"
    inputEmail = "input[name='email']"

    getButtonSalvar = () => cy.contains("Salvar")
    getButtonEditar = () => cy.contains("Editar")
    getButtonCancelar = () => cy.contains("Cancelar")

    buttonVoltar = "[href='/users']"
    buttonHome = "[href='/']"

    limparCampoNome() {
        cy.get(this.inputName).clear()
    }

    limparCampoEmail() {
        cy.get(this.inputEmail).clear()
    }

    digitarCampoNome(texto) {
        cy.get(this.inputName).type(texto)
    }

    digitarCampoEmail(texto) {
        cy.get(this.inputEmail).type(texto)
    }
}