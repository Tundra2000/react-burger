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

        /*window.localStorage.setItem(
            'refreshToken',
            JSON.stringify('d7725b3c053694ca1f1b8edc9330a553d54f39cf6780b07d8a50c05fe866a8c772d8317cef3c1459')
        );
        cy.setCookie(
            'token',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDRmNTFmNmQyOTk3MDAxY2FhOTA0OCIsImlhdCI6MTY5NDgyNjczNCwiZXhwIjoxNjk0ODI3OTM0fQ.xz0qInrHX5NyDvpzVD9f16bhcI712JklHvyoDsSpLxA'
        );*/

        //cy.intercept('GET', 'api/auth/user', user);
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
        //cy.drag('Соус традиционный галактический');


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
