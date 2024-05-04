import { DetalhesUsuario } from "../pages/detalhes-usuario"
import { PaginaInicial } from "../pages/pagina-inicial"
import { Given, When, Then, Before, After } from "cypress-cucumber-preprocessor/steps"

const paginaInicial = new PaginaInicial()
const baseUrl = "https://rarocrud-frontend-88984f6e4454.herokuapp.com"
let usuarioCriado
const detalhesUsuario = new DetalhesUsuario()
const elementoModal = '[aria-modal="true"]'

Before(function () {
    cy.viewport("macbook-13")
    cy.intercept("GET", "/api/v1/users/*",).as("getUserInfo")
})

After({ tags: "@deletarUsuario" }, function () {
    cy.deleteUserApi(usuarioCriado.id)
})

Given("que visitei a página inicial", function () {
    cy.visit('/')
})

Given('que tenho as informações de um usuário existente', function () {
    cy.createUserApi().then(function (bodyCriado) {
        usuarioCriado = bodyCriado
    })
})

Given('que este usuário aparece na listagem de usuários', function () {
    cy.intercept("GET", "api/v1/users", {
        body: [{
            "id": usuarioCriado.id,
            "name": usuarioCriado.name,
            "email": usuarioCriado.email,
            // "createdAt": "2024-04-26T20:45:44.936Z",
            // "updatedAt": "2024-04-26T20:45:44.936Z"
        }]
    }).as("getUsers")

    cy.wait("@getUsers")
})

Given('que tentei acessar a página terminando com {string}', function (url) {
    cy.visit(url)
})




When('clico no botão de ver detalhes do usuário', function () {
    cy.get(paginaInicial.itensListaUsuarios).find("a").click()
})

When('tento clicar num local fora da modal', function () {
    cy.get('#root > div div.sc-imWYAI.gFGqvV').click({ force: true })
})

When('clico no botão de cancelar', function () {
    cy.get(`${elementoModal} button`).contains("Cancelar").click()
})

When('clico no botão de "x"', function () {
    cy.get(`${elementoModal} button`).contains("x").click()
})



Then('devo ser redirecionado para a página de informações do usuário', function () {
    cy.url().should("equal", baseUrl + "/users/" + usuarioCriado.id)

    cy.wait("@getUserInfo")
})

Then('esta página deverá mostrar o id, nome e email corretos do usuário', function () {
    cy.get(detalhesUsuario.inputId).should("have.value", usuarioCriado.id)
    cy.get(detalhesUsuario.inputName).should("have.value", usuarioCriado.name)
    cy.get(detalhesUsuario.inputEmail).should("have.value", usuarioCriado.email)
})

Then('deve aparecer uma modal na tela com o título {string} e um texto {string}', function (titulo, texto) {
    cy.get(`${elementoModal} h2`).should('have.text', titulo)
    cy.get(`${elementoModal} p`).should('have.text', texto)
})

Then('a modal deverá ter um botão cujo texto seja {string} e um botão com um x para fechar o modal', function (textoBotao) {
    cy.get(`${elementoModal} button`).contains(textoBotao).should("exist")
    cy.get(`${elementoModal} button`).contains("x").should("exist")
})

Then('os valores da página por baixo da modal deverão ser valores vazios', function () {
    cy.get(detalhesUsuario.inputId).should("have.value", "")
    cy.get(detalhesUsuario.inputName).should("have.value", "")
    cy.get(detalhesUsuario.inputEmail).should("have.value", "")
})

Then('a modal não deverá ser fechada', function () {
    cy.get(elementoModal).should('exist')
})

Then('devo ser redirecionado para a página inicial', function () {
    cy.url().should('equal', `${baseUrl}/users`)
})