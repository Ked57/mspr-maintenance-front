describe("The home page shows something", () => {
  it("shows a title", () => {
    cy.visit("/");
    cy.contains("Upload your file");
  });
});

describe("The home page shows an error when no file is provided", () => {
    it("shows an error", () => {
      cy.visit("/");
      cy.get("#submit-btn").click()
      cy.contains("No file provided");
    });
  });
