import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/AdminPage';
import CandidatePage from '../pages/candidatePage';

const loginPage = new LoginPage();
const candidate = new CandidatePage();

let candidateId;
let candidateEmail;
let cookies;
let csrfToken;

Given("I navigate to the candidate page", () => {
  candidate.visit();
});



Given("I am logged in through API", () => {
  cy.request({
    method: "POST",
    url: "/web/index.php/auth/validate",
    form: true,
    body: {
      username: "Admin",
      password: "admin123"
    }
  }).then((res) => {
    expect(res.status).to.eq(200);

    // Store cookies
    cookies = res.headers['set-cookie'];
    // CSRF token is included in the cookie 'csrf_cookie'
    const csrfCookie = cookies.find(c => c.includes('csrf_token'));
    csrfToken = csrfCookie ? csrfCookie.split('=')[1].split(';')[0] : null;
  });
});

When("I add a new candidate using API", () => {
  candidateEmail = `api_test_${Date.now()}@mail.com`;

  cy.request({
    method: "GET",
    url: "/web/index.php/api/v2/recruitment/vacancies",
    headers: {
    }
  }).then((res) => {
    const vacancies = res.body.data;
    expect(vacancies.length).to.be.greaterThan(0);

    const validVacancyId = vacancies[0].id;

    return cy.request({
      method: "POST",
      url: "/web/index.php/recruitment/addCandidate",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken
      },
      body: {
        firstName: "API",
        lastName: "Candidate",
        email: candidateEmail,
        contactNumber: "1234567890",
        keywords: "Cypress, API",
        comment: "Created after fetching valid jobVacancy",
        jobVacancy: "Junior Account Assistant"
      }
    });
  }).then((res) => {
    expect(res.status).to.eq(200);
    candidateId = res.body.data.id;
  });
});


Then("I should see the candidate added", () => {
  cy.request({
    method: "GET",
    url: "/web/index.php/api/v2/recruitment/candidates",
    headers: {
      Cookie: cookies.join('; ')
    }
  }).then((res) => {
    const emails = res.body.data.map((c) => c.email);
    expect(emails).to.include(candidateEmail);
  });
});

When("I delete the candidate using API", () => {
  cy.request({
    method: "DELETE",
    url: `/web/index.php/api/v2/recruitment/candidates/${candidateId}`,
    headers: {
      Cookie: cookies.join('; '),
      "X-CSRF-TOKEN": csrfToken
    }
  }).then((res) => {
    expect(res.status).to.eq(200);
  });
});

Then("the candidate should be deleted", () => {
  cy.request({
    method: "GET",
    url: "/web/index.php/api/v2/recruitment/candidates",
    headers: {
      Cookie: cookies.join('; ')
    }
  }).then((res) => {
    const ids = res.body.data.map((c) => c.id);
    expect(ids).not.to.include(candidateId);
  });
});



When("I add a new candidate via the API", () => {
  const payload = {
    firstName: "API",
    lastName: "Candidate",
    email: `api_candidate_${Date.now()}@example.com`,
    contactNumber: "1234567890",
    keywords: "Automation, API",
    comment: "Added via Cypress API test",
    jobVacancy: 1,
  };

  candidateEmail = payload.email;

  cy.request({
    method: "POST",
    url: "/web/index.php/api/v2/recruitment/candidates",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  }).then((res) => {
    expect(res.status).to.eq(200);
    candidateId = res.body.data.id;
  });
});

Then("the candidate should be added", () => {
  expect(candidateId).to.exist;

  cy.request({
    method: "GET",
    url: "/web/index.php/api/v2/recruitment/candidates",
  }).then((res) => {
    const emails = res.body.data.map((c) => c.email);
    expect(emails).to.include(candidateEmail);
  });
});

When("I delete the candidate via the API", () => {
  expect(candidateId).to.exist;
  cy.request({
    method: "DELETE",
    url: `/web/index.php/api/v2/recruitment/candidates/${candidateId}`,
  }).then((res) => {
    expect(res.status).to.eq(200);
  });
});

Then("the candidate should be deleted-2", () => {
  cy.request({
    method: "GET",
    url: "/web/index.php/api/v2/recruitment/candidates",
  }).then((res) => {
    const ids = res.body.data.map((c) => c.id);
    expect(ids).not.to.include(candidateId);
  });
});
