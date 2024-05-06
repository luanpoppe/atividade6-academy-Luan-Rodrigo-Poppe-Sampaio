import { faker } from '@faker-js/faker';
import { Given, When, Then, Before, After } from "cypress-cucumber-preprocessor/steps"
import { CriarUsuario } from '../pages/criar-usuario';

const criarUsuario = new CriarUsuario()
const baseUrl = "https://rarocrud-frontend-88984f6e4454.herokuapp.com"
const userFaker = { name: "teste" + faker.person.firstName(), email: faker.internet.email().toLowerCase() }
let usuarioCriadoPreviamente


function postRequest() {
    return cy.get("@tentativaDeCriarUsuario")
}

// Before(function () {
//     cy.viewport("macbook-13")
//     cy.intercept("POST", "/api/v1//users").as("tentativaDeCriarUsuario")
// })

// Before({ tags: "@emailJaExistente" }, function () {
//     cy.intercept("POST", "/api/v1/users").as("criarUsuario")
// })

// After({ tags: "@emailJaExistente" }, function () {
//     cy.deleteUserApi(usuarioCriadoPreviamente.id)
// })

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