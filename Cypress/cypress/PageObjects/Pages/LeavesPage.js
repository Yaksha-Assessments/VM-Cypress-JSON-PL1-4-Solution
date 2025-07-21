class Leaves {
  elements = {
    // Define locators for elements on the Leaves page
    leaveTab: () => cy.contains('span.oxd-main-menu-item--name', 'Leave'),
    configureDropdown: () => cy.get('.oxd-topbar-body-nav-tab-item').contains('Configure'),
    holidayButton: () => cy.get('a.oxd-topbar-body-nav-tab-link').contains('Holiday'),
    addHolidayButton: () => cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary').contains('Add'),
    nameInput: () => cy.contains('label', 'Name').parent().siblings('div').find('input.oxd-input').type('Your Holiday Name'),

    dateInput: () => cy.get('input.oxd-input[placeholder="yyyy-dd-mm"]'),
    fullDayDropdown: () => cy.get('.oxd-select-text-input').contains('Full Day'),
    fullDayOption: (option) => cy.get('.oxd-select-dropdown').contains(option),
    saveButton: () => cy.get('button[type="submit"]').contains('Save'),
    finalList: () => cy.get('.orangehrm-container').find('.oxd-table-cell') 

  };

  leaveCreation() {
    cy.fixture('holidayForm').then((data) => {
      // Navigate to the Leaves page
      cy.wait(2000);
      this.elements.leaveTab().click();
      
      this.elements.configureDropdown().click();
      // Click on the Holiday button
      cy.wait(2000);
      this.elements.holidayButton().click();

      // Click on the Add Holiday button
      cy.wait(2000);
      this.elements.addHolidayButton().click();

      // Fill Name
      cy.wait(2000);
      this.elements.nameInput().clear().type(data.name);

      // Fill Date
      cy.wait(2000);
      const formattedDate = getRandomDate('2025-01-01', '2025-12-31');

      this.elements.dateInput().clear().type(formattedDate);
      this.elements.fullDayDropdown().click();
      this.elements.fullDayOption(data.fullDay).click();

      // Submit
      cy.wait(2000);
      this.elements.saveButton().should('be.visible').click();
    });


  }
}


// ------------------------------------ Helper Function ------------------------------------

function getRandomDate(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split('T')[0]; // returns 'YYYY-MM-DD'
}




export default Leaves;