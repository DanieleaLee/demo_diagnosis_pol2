describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });


  it("Has Login Button", () => {
    const loginButton = cy.getBySel('test-login-button');
    console.log(loginButton);
    expect(loginButton).not.equal(null);

  });

});
