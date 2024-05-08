import { Given, When, Then, Before, After } from "cypress-cucumber-preprocessor/steps"
import { DetalhesUsuario } from "../pages/detalhes-usuario"

let user
let usuarioCriadoPreviamente
const pageDetalhesUsuario = new DetalhesUsuario()
const baseUrl = "https://rarocrud-frontend-88984f6e4454.herokuapp.com"

Before(function () {
    cy.viewport("macbook-13")
    cy.intercept("PUT", "/api/v1/users/*").as("putRequest")
})

After(function () {
    cy.deleteUserApi(user.id)
})

Before({ tags: "@emailJaExistente" }, function () {
    cy.intercept("POST", "/api/v1/users").as("criarUsuario")
})

After({ tags: "@emailJaExistente" }, function () {
    cy.deleteUserApi(usuarioCriadoPreviamente.id)
})

Given('que existe um usuário', function () {
    cy.createUserApi().then(function (body) {
        user = body
    })
})

Given('que acessei a página de detalhes deste usuário', function () {
    cy.visit("/users/" + user.id)
})

Given('que cliquei no botão de editar', function () {
    pageDetalhesUsuario.getButtonEditar().click()
})

Given('clico no botão de salvar', function () {
    pageDetalhesUsuario.getButtonSalvar().click()
})

When('deixo os campos de email e nome em branco', function () {
    pageDetalhesUsuario.limparCampoEmail()
    pageDetalhesUsuario.limparCampoNome()
})

Then('deve aparecer as mensagens informando que os campos de nome e email são obrigatório', function () {
    cy.contains("O campo nome é obrigatório.").should("exist")
    cy.contains("O campo e-mail é obrigatório.").should("exist")
})

When('deixo o campo de nome vazio', function () {
    cy.get(pageDetalhesUsuario.inputName).clear()
})

Then('não deve ser feita uma requisição à API', function () {
    cy.get("@putRequest").should("not.exist")
})

Then('deve aparecer uma mensagem informando que o campo de nome é obrigatório', function () {
    cy.contains("O campo nome é obrigatório.").should("exist")
    cy.contains("O campo e-mail é obrigatório.").should("not.exist")
})

When('passo um nome contendo menos de 4 caracteres no campo de nome', function () {
    pageDetalhesUsuario.limparCampoNome()
    pageDetalhesUsuario.digitarCampoNome("abc")
})

Then('deve aparecer a mensagem {string}', function (mensagem) {
    cy.contains(mensagem).should("exist")
})

Given('passo um nome contendo mais de 100 caracteres no campo de nome', function () {
    let valorNome = ""
    while (valorNome.length < 101) {
        valorNome += "a"
    }

    pageDetalhesUsuario.limparCampoNome()
    pageDetalhesUsuario.digitarCampoNome(valorNome)
})

When('passo um nome contendo números no campo de nome', function () {
    pageDetalhesUsuario.limparCampoNome()
    pageDetalhesUsuario.digitarCampoNome("NomeUsuario123456")
})

When('passo um nome contendo símbolos no campo de nome', function () {
    pageDetalhesUsuario.limparCampoNome()
    pageDetalhesUsuario.digitarCampoNome("NomeUsuario$")
})

When('passo deixo o campo de email vazio', function () {
    pageDetalhesUsuario.limparCampoEmail()
})

When('passo um email com mais de 60 caracteres para o campo de email', function () {
    let valorEmail = "abc@gmail.com."
    while (valorEmail.length < 61) {
        valorEmail += "a"
    }
    pageDetalhesUsuario.limparCampoEmail()
    pageDetalhesUsuario.digitarCampoEmail(valorEmail)
})

When('passo um email sem conter o @ para o campo de email', function () {
    pageDetalhesUsuario.limparCampoEmail()
    pageDetalhesUsuario.digitarCampoEmail("emailgmail.com")
})

When('passo um email sem caracteres após o símbolo de @ para o campo de email', function () {
    pageDetalhesUsuario.limparCampoEmail()
    pageDetalhesUsuario.digitarCampoEmail("email@")
})

When('passo um email sem caracteres após o símbolo de @ para o campo de email', function () {
    pageDetalhesUsuario.limparCampoEmail()
    pageDetalhesUsuario.digitarCampoEmail("email@gmail")
})

Given('que eu tenha o email de outro usuário que já existe', function () {
    cy.createUserApi().then(function (body) {
        usuarioCriadoPreviamente = body
    })
})

When('passo o email do outro usuário já existente para o campo de email', function () {
    pageDetalhesUsuario.limparCampoEmail()
    pageDetalhesUsuario.digitarCampoEmail(usuarioCriadoPreviamente.email)
})

Then('deve aparecer uma modal com o título sendo {string}', function (titulo) {
    cy.contains(titulo).should("exist")
})

Then('a modal deve conter um botão de cancelar', function () {
    cy.get("[aria-modal='true'] button").contains("Cancelar").should("exist")
})

Then('a modal deve conter um botão com um x', function () {
    cy.get("[aria-modal='true'] button").contains("x").should("exist")
})

When('clico no botão de cancelar da modal de erro', function () {
    cy.get("[aria-modal='true'] button").contains("Cancelar").click()
})

Then('a modal deve ser fechada', function () {
    cy.get("[aria-modal='true']").should("not.exist")
})

Then('devo continuar na página de detalhes do usuário sendo editado', function () {
    cy.url().should("equal", `${baseUrl}/users/${user.id}`)
})

Then('clico no botão de "x" da modal de erro', function () {
    cy.get("[aria-modal='true'] button").contains("x").click()
})

Then('o campo de nome não deve ter seu valor resetado', function () {
    cy.get(pageDetalhesUsuario.inputName).should("have.value", user.name)
})

Then('o campo de email não deve ter seu valor resetado', function () {
    cy.get(pageDetalhesUsuario.inputEmail).should("have.value", usuarioCriadoPreviamente.email)
})

Then('o botão de salvar deve estar habilitado', function () {
    pageDetalhesUsuario.getButtonSalvar().should('be.enabled')
})

Then('a mensagem da API deve dizer corretamente que o usuário já existe', function () {
    cy.wait("@putRequest").then(function (res) {
        expect(res.response.statusCode).to.equal(422)
        expect(res.response.body).to.deep.equal({ error: "E-mail already in use." })
    })
})