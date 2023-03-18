///  <reference types="cypress"/>

class LoginPage {
  constructor() {}

  acessar() {
    cy.visit("/");
  }

  preencherFormulario(user) {
    if (user.email) {
      cy.get("input[placeholder$=email]").type(user.email);
    }

    if (user.password) {
      cy.get("input[placeholder*=senha]").type(user.password);
    }
  }

  submeterFormulario() {
    cy.contains("button", "Entrar").click();
  }

  mensagemAlertaLogin(message) {
    cy.get(".notice-container")
      .should("be.visible")
      .find(".error p")
      .should("have.text", message);
  }

  mensagemAlertaCampo(message) {
    cy.get(".alert-error").should("be.visible").and("have.text", message);
  }
}

export default new LoginPage();
