import { HomeComponent } from 'src/app/home/home.component';

describe('template spec', () => {
  it('visit', () => {
    cy.visit('http://localhost:4200/home');
  });
});
