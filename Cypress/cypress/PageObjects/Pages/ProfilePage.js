class ProfilePage {

  elements = {
    myInfoTab: () => cy.contains('span.oxd-main-menu-item--name', 'My Info'),
    profileImageWrapper: () => cy.get('.orangehrm-edit-employee-image-wrapper'),
    fileInput: () => cy.get('input[type="file"]'),
    saveButton: () => cy.contains('button', 'Save'),
    uploadedImage: () => cy.get('.orangehrm-edit-employee-image-wrapper img')
  };

  // Full flow of uploading image
  uploadProfilePicture(imageFileName) {
    this.elements.myInfoTab().click();
    cy.wait(2000);
    
    this.elements.profileImageWrapper().click();
    cy.wait(2000);
    
    this.elements.fileInput().selectFile(`cypress/fixtures/${imageFileName}`, { force: true });
    cy.wait(2000);
    
    this.elements.saveButton().click();
  }

}

export default ProfilePage;
