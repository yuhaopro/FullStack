describe("Blog website", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("BACKEND")}/test/reset`);
    const user = {
      name: "john",
      username: "john",
      password: "12345",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit('/');
  });

  it("Login form is shown", () => {
    cy.contains("Login").click()
  })
});
