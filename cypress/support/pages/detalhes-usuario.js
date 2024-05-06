export class DetalhesUsuario {
    inputId = "input[name='id']"
    inputName = "input[name='name']"
    inputEmail = "input[name='email']"

    getButtonSalvar = () => cy.contains("Salvar")
    getButtonEditar = () => cy.contains("Editar")
    getButtonCancelar = () => cy.contains("Cancelar")


    buttonVoltar = "[href='/users']"
    buttonHome = "[href='/']"
}