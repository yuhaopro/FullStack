describe("Blog website", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("BACKEND")}/test/reset`);
    const user = {
      name: "john",
      username: "john",
      password: "12345",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("/");
  });

  it("Login form is shown", () => {
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Login").click();
  });

  it("Login to be successful", () => {
    cy.get("#username").type("john");
    cy.get("#password").type("12345");
    cy.get("#submit-button").click();
  });

  it("Login unsuccessful", () => {
    cy.get("#username").type("john");
    cy.get("#password").type("wrong");
    cy.get("#submit-button").click();
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.login({ username: "john", password: "12345" });
    });

    it("Create blog", () => {
      cy.contains("new blog").click();
      cy.get("#title").type("Atomic Habits");
      cy.get("#author").type("James Clear");
      cy.get("#url").type("jamesclear.com");
      cy.get("#create-blog-submit").click();
      cy.contains("Atomic Habits James Clear");
    });

    describe("when blogs are created", () => {
      // using custom commands defined in support/commands.js for creating blogs
      beforeEach(() => {
        cy.createForm({
          title: "Thinking Fast and Slow",
          author: "Daniel Khaneman",
          url: "thinkingfastandslow.com",
        });
      });
      it("Like blog", () => {
        cy.contains("view").click();
        cy.get("#likesButton").click();
        cy.contains("likes 1");
      });
    });
  });
});
