const testUrl = 'http://localhost:3000';
describe('service is available', function() {
    it('Запуск прилжения по адресу localhost:3000', function() {
      //cy.start();
      cy.visit(testUrl);
    });
  }); 