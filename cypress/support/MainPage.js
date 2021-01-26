export default () => ({
    elements: {
      cart_link: ".shopping_cart",
      popular_itms: "ul#homefeatured",
      bestsellers_itms: "ul#blockbestsellers",
      modal: '#layer_cart',
      close_modal_btn: "div.layer_cart_product span[title='Close window']",
      cart_products: '.cart_block_list .products',
      search_input: 'input.search_query',
      products_list: 'ul.product_list',
      store_info_section: 'section#block_contact_infos'
    },
    addItmToCart(pos) {
      cy.get(`${this.elements.products_list}.active li:nth-child(${pos}) a.ajax_add_to_cart_button`).click();
    },
    removeFirstItmCart(){
      cy.get(`${this.elements.cart_products} .first_item span.remove_link a`).click({force: true});
    },
    searchItm(name){
      cy.get(this.elements.search_input).clear().type(`${name}{enter}`);
    }
  });