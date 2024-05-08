import { Given, When, Then, After, Before } from "@badeball/cypress-cucumber-preprocessor"
import { PaginaInicial } from "../pages/pagina-inicial"

const paginaInicial = new PaginaInicial()
const baseUrl = "https://rarocrud-frontend-88984f6e4454.herokuapp.com"
const apiUrl = Cypress.env("apiUrl")
let user
const botaoCriarNovoUsuario = ".sc-koXPp.csBRDe " + ".sc-bmzYkS.dmSxaj"

Before(function () {
    cy.viewport("macbook-13")
    cy.intercept("GET", "/api/v1/search?value=*").as("getPesquisa")
})

Before({ tags: "@criacaoDeUsuario" }, function () {
    cy.createUserApi().then(function (body) {
        user = body
    })
})

After({ tags: "@criacaoDeUsuario" }, function () {
    cy.deleteUserApi(user.id)
})

Given('que acessei a página inicial do site', function () {
    cy.visit("/")
})

Given('não digitei nada no campo de pesquisa', function () {

})

Given('que fiz uma pesquisa utilizando o campo de pesquisa', function () {
    cy.intercept("GET", "/api/v1/users").as("getTodosUsuarios")
    paginaInicial.pesquisarUsuario("aa")
    cy.get(paginaInicial.inputPesquisar).should("have.value", "aa")
    cy.get("@getTodosUsuarios").should("not.exist")
})


When('faço uma pesquisa utilizando o campo de pesquisa', function () {
    paginaInicial.pesquisarUsuario("aa")
})

When('clico no botão de resetar o campo de pesquisa', function () {
    cy.get('.sc-iGgWBj.cvYpuE').eq(1).click()
})

When('apago manualmente o valor digitado no campo de pesquisa', function () {
    cy.get("@getTodosUsuarios").should("not.exist")
    paginaInicial.pesquisarUsuario("{backspace}{backspace}")
})

When('pesquiso por um usuário que tenho certeza que não existe', function () {
    const nomeASerPesquisado = "usuarioNaoExistenteComCertezaNaoExisteEsseUser@gmail.com"

    // Garantindo que o usuário que irei pesquisar não existe, e caso exista, deleto ele antes de realizar a pesquisa
    cy.request(apiUrl + "/users").then(function (resposta) {
        const usersThatMatch = resposta.body.filter((usuario) => usuario.email == nomeASerPesquisado)
        const botaoCriarNovoUsuario = ".sc-koXPp.csBRDe " + ".sc-bmzYkS.dmSxaj"

        if (usersThatMatch.length > 0) cy.deleteUserApi(usersThatMatch[0].id)
        paginaInicial.pesquisarUsuario(nomeASerPesquisado)
        cy.wait("@getPesquisa")
    })
})

When('pesquiso pelo nome de um usuário que tenho certeza que existe', function () {
    paginaInicial.pesquisarUsuario(user.name)
})

When('pesquiso pelo email de um usuário que tenho certeza que existe', function () {
    paginaInicial.pesquisarUsuario(user.email)
    cy.wait("@getPesquisa")
})

When('clico no botão de ver detalhes do usuário', function () {
    cy.get(paginaInicial.itensListaUsuarios).should("have.length", 1)
    cy.get("#userDataDetalhe").click()
})


Then('a barra de pesquisa deve existir', function () {
    cy.get(paginaInicial.inputPesquisar).should("exist")
})

Then('ela deve estar habilitada', function () {
    cy.get(paginaInicial.inputPesquisar).should("be.enabled")
})

Then('uma pesquisa deve ser realizada pelo site', function () {
    cy.wait("@getPesquisa").should("exist")
})

Then('nenhuma busca à API de pesquisa é feita', function () {
    cy.get("@getPesquisa").should("not.exist")
})

Then('o botão de resetar o valor pesquisado não deve existir ainda', function () {
    cy.get('.sc-iGgWBj.cvYpuE').eq(1).should("be.empty")
})

Then('o botão de resetar o valor pesquisado deve aparecer', function () {
    cy.get('.sc-iGgWBj.cvYpuE').eq(1).should("not.be.empty")
})

Then('o valor do campo de pesquisa deverá ser resetado', function () {
    cy.get(paginaInicial.inputPesquisar).should("not.have.value")
})

Then('uma pesquisa por todos os usuários deve ser feita', function () {
    cy.wait("@getTodosUsuarios").should("exist")
})

Then('deverá aparecer a mensagem {string} na tela', function (mensagem) {
    cy.get("h3").should('have.text', mensagem)
})

Then('deverá aparecer um botão para cadastrar novo usuário na tela', function () {
    cy.get(botaoCriarNovoUsuario + " p").should('have.text', "Cadastre um novo usuário")
})

Then('não deve mostrar nenhum usuário cadastrado na tela', function () {
    cy.get(paginaInicial.itensListaUsuarios).should("not.exist")
})

Then('o botão de novo cadastro botão deve redirecionar à página de cadastrar novo usuário ao ser clicado', function () {
    cy.get(botaoCriarNovoUsuario).click()
    cy.url().should("equal", baseUrl + "/users/novo")
})

Then('deverá aparecer na tela informações sobre o usuário pesquisado', function () {
    // Se o resultado da pesquisa trouxer 6 ou menos usuários, todos aparecerão na página, e assim busco nos elementos da página. Este será o cenário mais comum.
    // Se por acaso o resultado trouxer mais de 6 usuários, o usuário criado por estar em outra página que não a primeira, tornando inviável buscar página a página.
    // Nesse segundo cenário, a solução que encontrei foi checar que o body da resposta da API traz o usuário criado na sua lista de usuários pesquisados.
    cy.wait("@getPesquisa").then(function (res) {
        cy.get(paginaInicial.itensListaUsuarios).should("have.length.above", 0)

        const usuariosPesquisados = res.response.body

        if (usuariosPesquisados.length <= 6) {
            cy.get(paginaInicial.itensListaUsuarios).should("contain.text", user.name)

            // Garantindo que mesmo que o email seja muito grande e não apareça todo na tela, a parte que aparece é uma "sub-parte" do email criado
            cy.get('[data-test="userDataEmail"]').invoke("text").then((texto) => {
                const emailsSeparados = texto.split("E-mail: ").toString().split("...").toString().split(",")
                const isEmailInPage = emailsSeparados.some((item) => user.name.includes(item))

                expect(isEmailInPage).to.equal(true)
            })
        }
        else {
            const isUserCreatedInResponse = usuariosPesquisados.some((usuario) => usuario.name == user.name)
            expect(isUserCreatedInResponse).to.equal(true)
            cy.get(paginaInicial.buttonNextPage).should("be.enabled")
        }
    })
})

Then('deverá aparecer na tela informações sobre o usuário pesquisado pelo email', function () {
    cy.get(paginaInicial.itensListaUsuarios).should("have.length", 1)
    cy.get(paginaInicial.itensListaUsuarios).should("contain.text", user.name)

    // Garantindo que mesmo que o email seja muito grande e não apareça todo na tela, a parte que aparece é uma "sub-parte" do email criado
    cy.get('[data-test="userDataEmail"]').invoke("text").then((texto) => {
        const emailsSeparados = texto.split("E-mail: ").toString().split("...").toString().split(",").filter((item) => item != "")
        const isEmailInPage = emailsSeparados.some((item) => user.email.includes(item))

        expect(isEmailInPage).to.equal(true)
    })
})

Then('deverá abrir a página de detalhes do usuário', function () {
    cy.url().should("equal", `${baseUrl}/users/${user.id}`)
})

Then('conter as informações corretas sobre nome, email e id do usuário', function () {
    cy.get("[name='id']").should('have.value', user.id)
    cy.get("[name='name']").should('have.value', user.name)
    cy.get("[name='email']").should('have.value', user.email)
})