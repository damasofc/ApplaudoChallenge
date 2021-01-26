import mainPage from "../support/MainPage";

describe('', () => {
    const MainPage = mainPage();

    before(() => {
        cy.visit('/');
    })

    it('Should be able to add an item to the cart', () => {
        cy.server();
        cy.route("POST", /.rand=(0-9)*/).as(
          "addCart"
        );
        MainPage.addItmToCart(1);
        cy.wait("@addCart")
        cy.get(MainPage.elements.modal).should('have.css','display','block');
        cy.get(MainPage.elements.close_modal_btn).click();
        cy.get(MainPage.elements.cart_products).should('exist');
    });

    it('Should be able to remove an item from the cart', () => {
        cy.server();
        cy.route("POST", /.rand=(0-9)*/).as(
          "removeCart"
        );
        MainPage.removeFirstItmCart();
        cy.wait("@removeCart")
        cy.get(MainPage.elements.cart_products).should('not.exist');
    });

    it('Should show items when searching for a valid name item', () => {
        cy.server();
        cy.route("GET", /.controller=search./).as(
            "search"
        );
        MainPage.searchItm('dress')
        cy.wait("@search")
        cy.get(MainPage.elements.products_list).children().should('have.length.at.least',1);
    });

    it("Shouldn't show items when searching for an invalid name item", () => {
        cy.server();
        cy.route("GET", /.controller=search./).as(
            "search"
        );
        MainPage.searchItm('12*')
        cy.wait("@search")
        cy.get(MainPage.elements.products_list).should('not.exist');
    });

    it("There should be the store information", () => {
        cy.get(`${MainPage.elements.store_info_section} ul`).children().should('have.length',3);
    });
})
