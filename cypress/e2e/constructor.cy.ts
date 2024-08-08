import user from '../fixtures/user.json';
import ingredients from '../fixtures/ingredients.json';
import order from '../fixtures/order.json';

const testUrl = 'http://localhost:3000';

describe('Создание заказа', () => {
    before(() => {
        cy.viewport(1920, 1280);
        //переход по пути http://localhost:3000
        cy.visit(testUrl);
        cy.contains('Соберите бургер');
    });

    it('Сборка и оформление заказа', () => {

        cy.clearLocalStorage();
        cy.clearCookies() ;

        cy.intercept('GET', 'api/ingredients', ingredients);

        //Modal
        cy.get('div').contains('Краторная булка N-200i').click();
        cy.contains('Детали ингредиента');
        cy.closeModal();
        cy.get('div').contains('Филе Люминесцентного тетраодонтимформа').click();
        cy.contains('Детали ингредиента');
        cy.closeModal();

        //dragDrop
        cy.drag('Краторная булка N-200i');
        cy.drag('Филе Люминесцентного тетраодонтимформа');


        // Переход на страницу авторизации
        cy.orderButtonClick();

        // Данные авторизации
        cy.get('[data-test="email"]').type(user.user.email);
        cy.get('[data-test="password"]').type('123');
        cy.loginButtonClick();

        cy.location().should((loc) => expect(loc.pathname).to.eq('/'));
        cy.wait(500);



        //Оформлени езаказа
        cy.orderButtonClick();
        
        cy.intercept('POST', 'api/orders', order);

        cy.wait(20000);
        cy.closeModal();

        cy.clearLocalStorage();
        cy.clearCookies() ;

    });



});
