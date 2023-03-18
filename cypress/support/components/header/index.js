///  <reference types="cypress"/>

class Header {
  validaUsuarioLogado(name) {
    cy.get(".logged-user div a[href='/shavers']")
      .should("be.visible")
      .and("have.text", `Olá, ${name}`);
  }
}

export default new Header();
