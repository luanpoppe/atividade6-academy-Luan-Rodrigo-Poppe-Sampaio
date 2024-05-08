import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor"
import { DetalhesUsuario } from "../pages/detalhes-usuario"

let user
const pageDetalhesUsuario = new DetalhesUsuario()
const baseUrl = "https://rarocrud-frontend-88984f6e4454.herokuapp.com"

Before(function () {
    cy.viewport("macbook-13")
})

After(function () {
    cy.deleteUserApi(user.id)
})

Given('que existe um usuário', function () {
    cy.createUserApi().then(function (body) {
        user = body
    })
})

Given('acesso a página de detalhes deste usuário', function () {
    cy.visit("/users/" + user.id)
})

Given('que cliquei no botão de editar', function () {
    pageDetalhesUsuario.getButtonEditar().click()
})

Given('que modifiquei os valores dos campos de nome e email', function () {

    cy.get(pageDetalhesUsuario.inputEmail).type("adicionadoAoEmail")
    cy.get(pageDetalhesUsuario.inputName).type("adicionadoAoNome")
})


When('clico no botão de editar', function () {
    pageDetalhesUsuario.getButtonEditar().click()
})

When('clico no botão de "Cancelar"', function () {
    pageDetalhesUsuario.getButtonCancelar().click()
})

When('clico no botão de salvar', function () {
    cy.intercept("PUT", "api/v1/users/*").as("edicaoUsuario")
    pageDetalhesUsuario.getButtonSalvar().click()
})

When('retorno à página de detalhes do usuário', function () {
    cy.visit("/users/" + user.id)
})


Then('os campos de id, nome e email devem existir e estar desabilitados', function () {
    cy.get(pageDetalhesUsuario.inputId).should("be.disabled")
    cy.get(pageDetalhesUsuario.inputEmail).should("be.disabled")
    cy.get(pageDetalhesUsuario.inputName).should("be.disabled")
})

Then('o botão de Salvar deve estar desabilitado e o botão de editar deve estar habilitado', function () {
    pageDetalhesUsuario.getButtonSalvar().should("be.disabled")
    pageDetalhesUsuario.getButtonEditar().should("be.enabled")
})

Then('os campos de nome e email devem ficar habilitados', function () {
    cy.get(pageDetalhesUsuario.inputEmail).should("be.enabled")
    cy.get(pageDetalhesUsuario.inputName).should("be.enabled")
})

Then('o campo de ID deve continuar desabilitado', function () {
    cy.get(pageDetalhesUsuario.inputId).should("be.disabled")
})

Then('o botão de salvar se torna habilitado', function () {
    pageDetalhesUsuario.getButtonSalvar().should("be.enabled")
})

Then('o botão de editar se torna um botão de cancelar', function () {
    pageDetalhesUsuario.getButtonEditar().should("not.exist")
    pageDetalhesUsuario.getButtonCancelar().should("exist")
})

Then('este botão de cancelar deve estar habilitado', function () {
    pageDetalhesUsuario.getButtonCancelar().should("be.enabled")
})

Then('os campos de nome e email voltam a ficar desabilitados', function () {
    cy.get(pageDetalhesUsuario.inputId).should("be.disabled")
    cy.get(pageDetalhesUsuario.inputEmail).should("be.disabled")
    cy.get(pageDetalhesUsuario.inputName).should("be.disabled")
})

Then('o botão de salvar volta a ficar desabilitado', function () {
    pageDetalhesUsuario.getButtonSalvar().should("be.disabled")
})

Then('o texto deste botão voltar a ser "Editar"', function () {
    pageDetalhesUsuario.getButtonEditar().should("exist").and("be.enabled")
    pageDetalhesUsuario.getButtonCancelar().should("not.exist")
})

Then('os novos valores devem ser enviados à API', function () {
    cy.wait("@edicaoUsuario").then(function (resposta) {
        expect(resposta.request.body).to.deep.equal({
            email: user.email + "adicionadoaoemail",
            name: user.name + "adicionadoAoNome"
        })
    })
})

Then('deve aparecer a mensagem de sucesso na página {string}', function (mensagem) {
    cy.contains(mensagem).should("exist")
})

Then('o usuário deve ser redirecionado à página inicial do site', function () {
    cy.url().should("equal", baseUrl + "/users")
})

Then('as informações de nome e email devem estar atualizadas conforme a edição realizada', function () {
    cy.get(pageDetalhesUsuario.inputEmail).invoke("val").should("equal", user.email + "adicionadoaoemail")
    cy.get(pageDetalhesUsuario.inputName).invoke("val").should("equal", user.name + "adicionadoAoNome")
    cy.get(pageDetalhesUsuario.inputId).invoke("val").should("equal", user.id)
})