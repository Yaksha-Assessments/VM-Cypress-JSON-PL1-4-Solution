import LoginPage from '../PageObjects/Pages/LoginProfilePage';
import ProfilePage from '../PageObjects/Pages/ProfilePage';
import HomePage from '../PageObjects/Pages/HomePage';
import AdminPage from '../PageObjects/Pages/AdminPage';
import Leave from '../PageObjects/Pages/LeavesPage';

describe('Automation Suite for Yaksha Application', () => {
  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();
  const homePage = new HomePage();
  const adminPage = new AdminPage();
  const leaveCreation = new Leave();


  beforeEach(() => {
    // Visit the Login Page before each test
    loginPage.performLogin(); 

  });

  // Test Case 1
  it('Test Case-1: Verify Log Out button Working', () => {
    cy.wrap(null)
      .then(() => {
        // Navigate to Profile Page
        homePage.LogoutFuntionCheck();
      })
      .then(() => {
        verifyLogoutCompleted(); // Verify Logout Functionality
      });
  });

  // Test Case 2
  it('Test Case-2: Verify New holidays could be created', () => {
    cy.wrap(null)
      .then(() => {
        // Navigate to Leaves Page , Creating holiday
        leaveCreation.leaveCreation()
      })
      .then(() => {
        cy.wait(2000);
        // Verify the holiday is created
        verifyHoldiayCreaded();
      });

  });


  // Test Case 3
  it('Test Case-3: Verify Password Mismatch Error display', () => {
    cy.wrap(null).then(() => {
      // Navigate to Admin tab and click Add
        adminPage.passwordMismatchError();    

      }).then(() => {
        cy.wait(2000);
        verifyPasswordMismatchError(); // Verify the error message Password Mismatch
      });

  });

  // Test Case 4
  it('Test Case-4: Verify Admin can add record', () => {
    cy.wrap(null).then(() => {
        // Navigate to Admin Page and add a new admin user
        adminPage.addAdminUserForm();    

      }).then(() => {
        cy.wait(2000);
        verifyAddAdmin(); // Verify the error message Password Mismatch
      });

  });

  
  it('Test Case-5: Verify User should be deleted from the table', () => {
    cy.wrap(null).then(() => {

      // this Can't be done because verifying object is out os scope
      adminPage.deleteUserFromTable(); 
            
      }).then(() => {
        cy.wait(2000);
        // Verify the hover functionality works
        verifyDeleteUser();  
      });

  });


  // Test Case 6
  it('Test Case-6: Verify Image could be Uploaded as profile Pic', () => {
    cy.wrap(null).then(() => {
        // Changing Profile Picture
        profilePage.uploadProfilePicture('skyimage.jpg');
      })
      .then(() => {
        cy.wait(2000);
        // Verify the profile picture is updated
        verifyProfilePictureUpdated();
      });


  });

  // Test Case 7
  it('Test Case-7: Verify Admin can edit record ', () => {
    //Go to Buzz tab

    cy.wrap(null)
      .then(() => {
        // Accessing User Form Appear
        adminPage.editUserFormAppear();

      })
      .then(() => {
        cy.wait(2000);
        // Verify the User Edit Form appears
        verifyUserEditFormAppears();
      });
    
    });

  // Test Case 8
  it('Test Case-8 : Verify the Admin can sort the record', () => {
    cy.wrap(null).then(() => {
      // Navigate to Admin tab and sort by Username
      adminPage.goToAdminAndSortByUsername();

    }).then(() => {
      cy.wait(2000);
      // Verify the sorting functionality works
      verifyUsernamesAreSortedAsc();
    });
  });

  // Test Case 9
  it('Test Case-9: Verify new Tab opens on clicking the "Upgrade" button ', () => {
    cy.wrap(null).then(() => {
      
      // Navigate to Admin tab and sort by Username
      adminPage.NavigateToAdminPage();

    }).then(() => {
      cy.wait(2000);
      verifyUpgradeLinkAttributes();
      });

    });


  // Test Case 10
  it('Test Case-10: Verify tooltip shows up when hovered over "Help" button', () => {
    cy.wrap(null).then(() => {
      // Visit the Home Page
      adminPage.visitAdminForTolltip();
      
    }).then(() => {
      cy.wait(2000);
      // Verify the tooltip appears with correct title
      verifyHoverWork();
    });

  });


  // ---------------------- Helper Functions ----------------------

});




// Helper function moved outside the describe block
// Test Case 1: Verify Logout Completed
function verifyLogoutCompleted() {
  cy.url().should('include', '/auth/login');
  cy.contains('Login').should('be.visible');
};

// Test Case 2: Verify Holiday Created
function verifyHoldiayCreaded() {
  cy.fixture('HolidayForm').then((testData) => {
    cy.wait(2000); // wait for the list to update (optional)

    cy.get('.orangehrm-container')
      .find('.oxd-table-cell')
      .should('contain.text', testData.name);
  });
}

// Test Case 3: Verify Password Mismatch Error
function verifyPasswordMismatchError() {
  cy.wait(2000);
  cy.get('span.oxd-input-field-error-message')
    .should('be.visible')
    .contains('Passwords do not match');
}


// Test Case 4: Verify Upgrade Link Attributes
function verifyAddAdmin() {
  cy.wait(2000);
  cy.get('.oxd-toast').should('be.visible').and('contain', 'Successfully Saved');
  cy.log('Admin user added successfully');
}

// Test Case 5: Verify User Deletion
function verifyDeleteUser() {
  cy.wait(2000);
  cy.get('@deletedUsername').then((deletedName) => {
      // Wait for table to reload
      cy.wait(2000);
      // Verify deleted user is not listed
      cy.get('.oxd-table-body').should('not.contains.text', deletedName);
    });
}
// Test Case 6 : Verify Image Changes
function verifyProfilePictureUpdated() {
  // cy.wait(2000);
  cy.get('p.oxd-text.oxd-text--p.oxd-text--toast-message.oxd-toast-content-text', { timeout: 10000 })
      .should('contain.text', 'Successfully Updated')
      .and('be.visible');
}

// Test Case 7: Verify User Edit Form Appears
function verifyUserEditFormAppears() {

  cy.wait(2000);
  cy.get('h6.oxd-text.oxd-text--h6.orangehrm-main-title')
    .should('be.visible')
    .and('contain.text', 'Edit User');
}

// Test Case 8: Verify Admin Table Sorting
function verifyUsernamesAreSortedAsc() {
  cy.wait(2000);
  cy.get('.oxd-table-cell:nth-child(2)').then(($cells) => {
    const usernames = [];
    $cells.each((index, cell) => {
      usernames.push(cell.innerText.trim());
    });

    const sorted = [...usernames].sort((a, b) => a.localeCompare(b));

    expect(usernames).to.deep.equal(sorted);
  });
}

function verifyUpgradeLinkAttributes() {

    cy.wait(2000);
    cy.contains('h5.oxd-text.oxd-text--h5.oxd-table-filter-title' , 'System Users')
    cy.get('a.orangehrm-upgrade-link')
      .should('be.visible')                                       
      .and('have.attr', 'target', '_blank')                      
      .and('have.attr', 'href')                                
      .then((href) => {
        expect(href).to.include('orangehrm.com/open-source/upgrade-to-advanced');
      }); 
  }

 // Test Case 10
function verifyHoverWork() {
    cy.wait(2000);
    cy.contains('h5.oxd-text.oxd-text--h5.oxd-table-filter-title' , 'System Users')
    cy.get('button[title="Help"]')
    .should('be.visible')
    .and('have.attr', 'title', 'Help'); // Checking For HELP  Title
  }

