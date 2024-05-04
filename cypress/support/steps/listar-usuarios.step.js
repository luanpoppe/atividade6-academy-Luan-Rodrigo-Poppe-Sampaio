import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps"
import { PaginaInicial } from "../pages/pagina-inicial"

const paginaInicial = new PaginaInicial()
const baseUrl = "https://rarocrud-frontend-88984f6e4454.herokuapp.com"

Before(function () {
    cy.viewport("macbook-13")
})

Given("que visitei a página inicial", function () {
    cy.visit('/')
})

Given('que há 06 usuários cadastrados', function () {
    cy.intercept("GET", "api/v1/users", {
        fixture: "get-usuarios/get-6-usuarios.json"
    }).as("getUsers")

    cy.wait("@getUsers")
})

Given('que há 18 usuários cadastrados', function () {
    cy.intercept("GET", "api/v1/users", {
        fixture: "get-usuarios/get-18-usuarios.json"
    }).as("getUsers")

    cy.wait("@getUsers")
})

Given('que há 03 usuários cadastrados', function () {
    cy.intercept("GET", "api/v1/users", {
        fixture: "get-usuarios/get-3-usuarios.json"
    }).as("getUsers")

    cy.wait("@getUsers")
})



Then('ao acessar a página /users o total de páginas deverá ser 01', function () {
    cy.get(paginaInicial.itemPaginacaoAtual).should("have.text", "1 de 1")
})

Then('botões de avançar e voltar página devem estar desabilitados', function () {
    cy.get(paginaInicial.buttonNextPage).should("be.disabled")
    cy.get(paginaInicial.buttonPreviousPage).should("be.disabled")
})

Then('o total de usuário na página deve ser 06', function () {
    cy.get(`${paginaInicial.divListaUsuarios} > div`).should("have.length", 6)
})

Then('todos os usuários devem mostrar suas devidas informações corretas', function () {
    cy.get(paginaInicial.itensListaUsuarios).then(function (resposta) {
        for (let item of resposta) {
            cy.wrap(item).should("contain", "Nome")
            cy.wrap(item).should("contain", "E-mail")
            cy.wrap(item).find("#userDataDetalhe").should("have.text", "Ver detalhes")
            cy.wrap(item).find("[data-test='userDataDelete']").should("exist")
        }
    })
})

Then('o total de páginas deve ser 03', function () {
    cy.get(paginaInicial.itemPaginacaoAtual).should("have.text", "1 de 3")
})

Then('botão de avançar página deve estar habilitado, e o de voltar deve estar desabilitado', function () {
    cy.get(paginaInicial.buttonNextPage).should("be.enabled")
    cy.get(paginaInicial.buttonPreviousPage).should("be.disabled")
})

Then('o total de usuário na página deve ser 03', function () {
    cy.get(paginaInicial.itensListaUsuarios).should("have.length", 3)
})