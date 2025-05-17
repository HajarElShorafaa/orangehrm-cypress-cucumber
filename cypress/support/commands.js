Cypress.Commands.add("addCandidateAPI", () => {
  cy.getCookie('orangehrm').then((cookie) => {
  cy.request({
    method: "POST",
    url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates",
    headers: {
      Authorization: `Basic ${btoa("Admin:admin123")}`,
    },
    body: {
      firstName: "John",
      lastName: "Doe",
      email: `john.doe.${Date.now()}@example.com`,
      vacancyId: "1"
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(201);
    const id = response.body.data.id;
    Cypress.env("candidateId", id);
    cy.log(`Candidate added with ID: ${id}`);
  });
});
});

Cypress.Commands.add("deleteCandidateAPI", (candidateId) => {
  cy.request({
    method: "DELETE",
    url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${candidateId}`,
    headers: {
      Authorization: `Basic ${btoa("Admin:admin123")}`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(`Candidate deleted with ID: ${candidateId}`);
  });
});
