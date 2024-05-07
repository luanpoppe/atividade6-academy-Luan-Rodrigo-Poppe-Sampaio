import { Given, When, Then, Before, After } from "cypress-cucumber-preprocessor/steps"
import { DetalhesUsuario } from "../pages/detalhes-usuario"

let user
const pageDetalhesUsuario = new DetalhesUsuario()
const baseUrl = "https://rarocrud-frontend-88984f6e4454.herokuapp.com"

Before(function () {
    cy.viewport("macbook-13")
    cy.intercept("PUT", "/api/v1/users/*").as("putRequest")
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








// ------------------------------------ //

Given('que acessei a página de cadastrar usuários', function () {
    cy.visit('/users/novo')
})

Given('que não digito nada no campo de nome e no de email', function () {

})

Given('que digito um email válido', function () {
    cy.get(criarUsuario.inputEmail).type(userFaker.email)
})

Given('que não digito nada no campo de nome', function () {

})

Given('que digito um nome com menos de 04 caracteres', function () {
    cy.get(criarUsuario.inputNome).type("abc")
})

Given('que digito um nome com mais de 100 caracteres', function () {
    let valorNome = ""
    while (valorNome.length < 101) {
        valorNome += "a"
    }
    cy.get(criarUsuario.inputNome).type(valorNome)
})

Given('que digito um nome contendo números', function () {
    cy.get(criarUsuario.inputNome).type("NomeUsuario123456")
})

Given('que digito um nome contendo símbolos', function () {
    cy.get(criarUsuario.inputNome).type("NomeUsuario$")
})

Given('que digito um nome válido', function () {
    cy.get(criarUsuario.inputNome).type(userFaker.name)
})

Given('que não digito nada no campo de email', function () {

})

Given('que digito um email contendo mais de 60 caracteres', function () {
    let valorEmail = "abc@gmail.com."
    while (valorEmail.length < 61) {
        valorEmail += "a"
    }
    cy.get(criarUsuario.inputEmail).type(valorEmail)
})

Given('que digito um email sem conter o @ no campo de email', function () {
    cy.get(criarUsuario.inputEmail).type("emailgmail.com")
})

Given('que digito um email sem caracteres após o símbolo de @', function () {
    cy.get(criarUsuario.inputEmail).type("email@")
})

Given('que digito um email sem conter o ".com" ou ".*" ao final', function () {
    cy.get(criarUsuario.inputEmail).type("email@gmail")
})

Given('que eu tenha o email de um usuário que já existe', function () {
    cy.createUserApi().then(function (body) {
        usuarioCriadoPreviamente = body
    })
})

Given('que digito o email do usuário que já existe', function () {
    cy.get(criarUsuario.inputEmail).type(usuarioCriadoPreviamente.email)
})

When('clico no botão de cadastrar usuário', function () {
    criarUsuario.clicarBotaoSalvar()
})

When('clico no botão de cancelar da modal de erro', function () {
    cy.get("[aria-modal='true'] button").contains("Cancelar").click()
})


Then('deve aparecer as mensagens informando que os campos de nome e email são obrigatório', function () {
    cy.contains("O campo nome é obrigatório.").should("exist")
    cy.contains("O campo e-mail é obrigatório.").should("exist")
})

Then('não deve aparecer uma mensagem de sucesso', function () {
    cy.contains("Usuário salvo com sucesso!").should("not.exist")

    postRequest().should("not.exist")
})

Then('deve aparecer uma mensagem informando que o campo de nome é obrigatório', function () {
    cy.contains("O campo nome é obrigatório.").should("exist")
    cy.contains("O campo e-mail é obrigatório.").should("not.exist")
})

Then('deve aparecer a mensagem {string}', function (mensagem) {
    cy.contains(mensagem).should("exist")
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

Then('a modal deve ser fechada', function () {
    cy.get("[aria-modal='true']").should("not.exist")
})

Then('devo continuar na página de cadastrar novo usuário', function () {
    cy.url().should("equal", `${baseUrl}/users/novo`)
})

Then('clico no botão de "x" da modal de erro', function () {
    cy.get("[aria-modal='true'] button").contains("x").click()
})

Then('o campo de nome não deve ser resetados', function () {
    cy.get(criarUsuario.inputNome).should("have.value", userFaker.name)
})

Then('o campo de email não deve ser resetado', function () {
    cy.get(criarUsuario.inputEmail).should("have.value", usuarioCriadoPreviamente.email)
})

Then('o botão de salvar deve estar habilitado', function () {
    cy.get(criarUsuario.buttonSalvar).should('be.enabled')
})

Then('a mensagem da API deve informar corretamente que o usuário já existe', function () {
    cy.wait("@criarUsuario").then(function (res) {
        expect(res.response.statusCode).to.equal(422)
        expect(res.response.body).to.deep.equal({ error: "User already exists." })
    })
})