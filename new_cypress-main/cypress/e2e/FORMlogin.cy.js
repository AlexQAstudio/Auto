
import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
           });

    it('Верный пароль и верный логин', function () {
        cy.get('#mail').type(data.login);
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })
    it('Восстановление пароля', function () {
        cy.get('#forgotEmailButton').click();
        cy.get('#forgotForm > .header').contains('Восстановите пароль');
        cy.get('#exitRestoreButton > .exitIcon').should('be.visible');
        cy.get('#mailForgot').type(data.login);
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail')
    })
    it('Негативный кейс авторизации (неверный пароль)', function () {
        cy.get('#mail').type(data.login);
        cy.get('#pass').type('FuckUp');
        cy.get('#loginButton').click();
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
        cy.get('#messageHeader').contains('Такого логина или пароля нет')
    })
      it('Негативный кейс авторизации (неверный логин)', function () {
        cy.get('#mail').type('FuckUp@mail.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
        cy.get('#messageHeader').contains('Такого логина или пароля нет')
    })
      it('Негативный кейс валидации (логин без @)', function () {
        cy.get('#mail').type('FuckUpmail.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации')
    })
      it('Строчные буквы в логине', function () {
        cy.get('#mail').type('GerMan@Dolnikov.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
        cy.get('#messageHeader').contains('Авторизация прошла успешно')
    }) 
    })