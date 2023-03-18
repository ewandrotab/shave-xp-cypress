///  <reference types="cypress"/>

describe("App", () => {
  it("Deve estar online", () => {
    cy.visit("http://localhost:3000/");
    cy.title().should("equal", "Shave eXperience");
  });
});
