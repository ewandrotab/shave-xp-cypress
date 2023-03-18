///  <reference types="cypress"/>

describe("App", () => {
  it("Deve estar online", () => {
    cy.visit("/");
    cy.title().should("equal", "Shave eXperience");
  });
});
