// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", ({username, password}) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("user", JSON.stringify(body));
  });
  cy.visit("/");
});

Cypress.Commands.add("createForm", ({ title, author, url }) => {
//     const user = {_id: `Bearer ${JSON.parse(localStorage.getItem("user")).id}`}
//   cy.request({
//     url: `${Cypress.env("BACKEND")}/blogs`,
//     method: "POST",
//     body: { title, author, url, user },
//     headers: {
//       'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
//     },
//   });
//   cy.visit("/");

    cy.contains("new blog").click();
    cy.get("#title").type(title);
    cy.get("#author").type(author);
    cy.get("#url").type(url);
    cy.get("#create-blog-submit").click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
