import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor"
import { PaginaInicial } from "../pages/pagina-inicial"

const paginaInicial = new PaginaInicial()
const baseUrl = "https://rarocrud-frontend-88984f6e4454.herokuapp.com"
let nextPage
let previousPage

Before(function () {
    cy.viewport("macbook-13")
})

Before({ tags: "@testeComBotoes" }, function () {
    nextPage = () => cy.get(paginaInicial.buttonNextPage).click()
    previousPage = () => cy.get(paginaInicial.buttonPreviousPage).click()
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

Given('que não há usuários cadsatrados', function () {
    cy.intercept("GET", "api/v1/users", {
        body: []
    }).as("getUsers")

    cy.wait("@getUsers")
})

Given('que há mais de 06 usuários cadastrados', function () {
    cy.intercept("GET", "api/v1/users", {
        fixture: "get-usuarios/get-18-usuarios.json"
    }).as("getUsers")

    cy.wait("@getUsers")
})

Given('que estou na página 02', function () {
    nextPage()
})





When('clico no botão de avançar página', function () {
    nextPage()
})

When('clico no botão de avançar página 02 vezes', function () {
    nextPage()
    nextPage()
})

When('clico no botão de voltar página', function () {
    previousPage()
})

When('clico no botão de home do header', function () {
    cy.get(paginaInicial.buttonHome).click()
})

When('clico no botão de cadastrar novo usuário do header do site', function () {
    cy.get(paginaInicial.buttonNovoUsuario).click()
})



Then('ao acessar a página de usuários o total de páginas deverá ser 01', function () {
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

Then('a página deverá ter um título com o texto {string}', function (texto) {
    cy.get("h3").should('have.text', texto)
})

Then('a apágina deverá ter um botão com o texto {string}', function (texto) {
    const cadastrarNovoUsuario = "[href='/users/novo']"

    cy.get(".sc-koXPp.csBRDe " + cadastrarNovoUsuario + " p").should('have.text', texto)
})

Then('a página não deverá ter informações sobre usuários', function () {
    cy.get(paginaInicial.itensListaUsuarios).should("not.exist")
})

Then('o botão de cadastrar usuário deverá redirecionar à URL correta', function () {
    const cadastrarNovoUsuario = "[href='/users/novo']"

    cy.get(".sc-koXPp.csBRDe " + cadastrarNovoUsuario).click()
    cy.url().should("equal", baseUrl + "/users/novo")
})

Then('o site deverá ir para a página 02', function () {
    cy.get(paginaInicial.itemPaginacaoAtual).should('have.text', "2 de 3")
})

Then('o site deverá mostrar as informações corretas dos usuários da página 02', function () {
    cy.get(paginaInicial.itensListaUsuarios).then(function (lista) {
        for (let item of lista) {
            cy.wrap(item).should('contain', "Página 02")
        }
    })
})

Then('o site deverá ir para a página 03', function () {
    cy.get(paginaInicial.itemPaginacaoAtual).should('have.text', "3 de 3")
})

Then('o botão de avançar deverá ficar desabilitado', function () {
    cy.get(paginaInicial.buttonNextPage).should('be.disabled')
})

Then('o site deverá mostrar as informações corretas dos usuários da página 03', function () {
    cy.get(paginaInicial.itensListaUsuarios).then(function (lista) {
        for (let item of lista) {
            cy.wrap(item).should('contain', "Página 03")
        }
    })
})

Then('o usuário deverá estar na página 01', function () {
    cy.get(paginaInicial.itemPaginacaoAtual).should('have.text', "1 de 3")
})

Then('o botão de voltar deverá estar desabilitado', function () {
    cy.get(paginaInicial.buttonPreviousPage).should('be.disabled')
})

Then('os usuários mostrados deverão ser os corretos da página 01', function () {
    cy.get(paginaInicial.itensListaUsuarios).then(function (lista) {
        for (let item of lista) {
            cy.wrap(item).should('contain', "Página 01")
        }
    })
})

Then('deverei ser redirecionado à página inicial', function () {
    cy.url().should("equal", baseUrl + "/users")
})

Then('deverei ser redirecionado à página de cadastrar usuários', function () {
    cy.url().should("equal", baseUrl + "/users/novo")
})