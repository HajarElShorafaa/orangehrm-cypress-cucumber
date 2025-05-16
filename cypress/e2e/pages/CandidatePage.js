class CandidatePage {

  visit() {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates");
  }

  fillCandidateForm(candidate) {
    cy.get("input[name='firstName']").type(candidate.firstName);
    cy.get("input[name='lastName']").type(candidate.lastName);
    cy.get("input[name='email']").type(candidate.email);
    cy.get("input[name='contactNumber']").type(candidate.contactNumber);

    // Dropdown: Job Vacancy
    cy.get(".oxd-select-text").first().click();
    cy.contains(".oxd-select-option", candidate.jobVacancy).click();

    cy.get("textarea[placeholder='Type here']").type(candidate.comment);

    // You can upload resume if needed using:
    // cy.get("input[type='file']").attachFile('resume.pdf');

    cy.get("button[type='submit']").click();
  }

  successToastShouldBeVisible() {
    cy.get(".oxd-toast").should("contain", "Successfully Saved");
  }
}

export default CandidatePage;
