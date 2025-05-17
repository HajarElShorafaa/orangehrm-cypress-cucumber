import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let candidateId;
let cookies={};

Given("I navigate to the candidate page", () => {
  cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates")
  cy.getCookies().then((cookiesList) => {
  cookiesList.forEach((cookie) => {
    cy.log(`${cookie.name}: ${cookie.value}`);
  });
  cy.getCookie('orangehrm').then((cookie) => {
  cookies["orangehrm"] = cookie.value;
  });
});
});


When("I add a new candidate using API", () => {
  //cy.addCandidateAPI();
  const uniqueEmail = `john.${Date.now()}@example.com`;

  cy.request({
    method: "POST",
    url: "/web/index.php/api/v2/recruitment/candidates",
    headers: {
      Cookie: `orangehrm=${cookies["orangehrm"]}`,
      "X-Requested-With": "XMLHttpRequest",
    },
    body: {
      firstName: "John",
      lastName: "Doe",
      email: uniqueEmail,
      vacancyId: 1,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    candidateId = response.body.data.id;
    cy.log("Candidate ID:", candidateId);
  });

});

When("I delete the candidate using API", () => {
  //const candidateId = Cypress.env("candidateId");
  //cy.deleteCandidateAPI(candidateId);
  cy.request({
    method: "DELETE",
    url: "/web/index.php/api/v2/recruitment/candidates",
    headers: {
      Cookie: `orangehrm=${cookies["orangehrm"]}`,
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
    body: {
      ids: [candidateId],
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log("Candidate deleted.");
  });
});
