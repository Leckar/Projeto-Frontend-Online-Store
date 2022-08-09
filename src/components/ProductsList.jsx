import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductItem from './ProductItem';
import '../styles/ProductsList.css';

export default class ProductsList extends Component {
  render() {
    const { products, cartButton, cart } = this.props;

    if (!products.length) return <h2>Nenhum produto foi encontrado</h2>;

    return (
      <div className="productsList">
        { products.map((product) => (
          <div
            className="productWrap"
            key={ product.id }
          >
            <ProductItem
              productDetails={ product }
            />
            { cart && (
              <div
                data-testid="shopping-cart-product-quantity"
              >
                { product.cartAmount }
              </div>) }
            <button
              type="button"
              data-productid={ product.id }
              data-testid="product-add-to-cart"
              onClick={ (target) => cartButton(target) }
            >
              { cart ? 'Remover do Carrinho' : 'Adicionar ao Carrinho' }
            </button>
          </div>
        )) }
      </div>
    );
  }
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cartButton: PropTypes.func.isRequired,
  cart: PropTypes.bool.isRequired,
};
