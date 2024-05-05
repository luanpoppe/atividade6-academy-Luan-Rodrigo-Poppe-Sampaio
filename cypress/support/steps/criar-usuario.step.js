import { faker } from '@faker-js/faker';
import { Given, When, Then, Before, After } from "cypress-cucumber-preprocessor/steps"
import { CriarUsuario } from '../pages/criar-usuario';

const criarUsuario = new CriarUsuario()
const apiUrl = Cypress.env("apiUrl")
const baseUrl = "https://rarocrud-frontend-88984f6e4454.herokuapp.com"
let user
let userFaker

// Before(function () {
//     userFaker = { name: "teste" + faker.person.firstName(), email: faker.internet.email().toLowerCase() }
//     cy.viewport("macbook-13")
//     cy.intercept("POST", "/api/v1/users").as("criarUsuario")
// })

// After(function () {
//     if (user?.id) cy.deleteUserApi(user.id)
// })



Given('que visitei a página de cadastrar usuários', function () {
    cy.visit('/users/novo')
})

Given('realizo o cadastro de um usuário pelo site', function () {
    cy.get(criarUsuario.inputNome).type(userFaker.name)
    cy.get(criarUsuario.inputEmail).type(userFaker.email)

    cy.intercept("POST", "/api/v1/users").as("criarUsuario")

    criarUsuario.clicarBotaoSalvar()
})

Given('faço uma consulta à API pelos usuários cadastrados', function () {
    cy.wait("@criarUsuario").then(function (res) {
        user = res.response.body
    })
})




When('clico no botão de voltar do header', function () {
    cy.get(criarUsuario.buttonVoltar).click()
})

When('digito um usuário válido no campo de nome e de email', function () {
    cy.get(criarUsuario.inputNome).type(userFaker.name)
    cy.get(criarUsuario.inputEmail).type(userFaker.email)
})

When('clico no botão de cadastrar', function () {
    criarUsuario.clicarBotaoSalvar()
})

When('Deverá aparecer uma mensagem na tela com o texto {string}', function (texto) {
    cy.wait("@criarUsuario").then(function (res) {
        user = res.response.body
    })
    cy.contains(texto).should("exist")
})

When('digito um email válido e um nome com {int} caracteres', function (numero) {
    let valorNome = ""
    cy.log('valorNome', valorNome)
    while (valorNome.length < numero) {
        valorNome += "a"
    }

    cy.log('valorNome', valorNome)
    cy.get(criarUsuario.inputEmail).type(userFaker.email)
    cy.get(criarUsuario.inputNome).type(valorNome)
})

When('digito um email válido e um nome com 4 caracteres', function () {
    let valorNome = "abcd"

    cy.get(criarUsuario.inputEmail).type(userFaker.email)
    cy.get(criarUsuario.inputNome).type(valorNome)
})

When('digito um nome válido e um email com {int} caracteres', function (numero) {
    let valorEmail = "b@gmail.com."
    while (valorEmail.length < numero) {
        valorEmail += "a"
    }

    cy.get(criarUsuario.inputEmail).type(valorEmail)
    cy.get(criarUsuario.inputNome).type(userFaker.name)
})




Then('o usuário deverá ser redirecionado à página inicial do site', function () {
    cy.url().should('equal', baseUrl + "/users")
})

Then('o usuário criado deverá estar presente no retorno da API', function () {
    cy.wait("@criarUsuario").then(function (res) {
        user = res.response.body

        cy.request(apiUrl + "/users/" + user.id).then(function (resposta) {
            expect(resposta.body).to.deep.include({
                name: userFaker.name,
                email: userFaker.email,
                id: user.id,
            })
        })
    })
})

Then('os campos de nome e email devem ter seus valores resetados', function () {
    cy.get(criarUsuario.inputNome).should("have.value", "")
    cy.get(criarUsuario.inputEmail).should("have.value", "")
})

Then('o botão de cadastrar deverá ficar desabilitado até o cadastro terminar', function () {
    cy.get(criarUsuario.buttonSalvar).should("be.disabled")

    cy.wait("@criarUsuario").then(function (res) {
        user = res.response.body
    })
})

Then('o usuário deve ser cadastrado com sucesso', function () {
    cy.wait("@criarUsuario").then(function (res) {
        user = res.response.body
        cy.contains("Usuário salvo com sucesso!").should("exist")
    })
})