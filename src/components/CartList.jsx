import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CartItem from './CartItem';
// import '../styles/CartList.css';

export default class CartList extends Component {
  render() {
    const { products, removeFromCart, removeOne, addOne } = this.props;

    if (!products.length) return <h2>Nenhum produto foi encontrado</h2>;

    return (
      <div className="productsList">
        { products.map((product) => (
          <div
            className="productWrap"
            key={ product.id }
          >
            <CartItem
              productDetails={ product }
            />
            <div>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                data-productid={ product.id }
                onClick={ (target) => removeOne(target) }
              >
                -
              </button>
              <div
                data-testid="shopping-cart-product-quantity"
              >
                { product.cartAmount }
              </div>
              <button
                type="button"
                data-testid="product-increase-quantity"
                data-productid={ product.id }
                onClick={ (target) => addOne(target) }
              >
                +
              </button>
            </div>
            <button
              type="button"
              data-productid={ product.id }
              data-testid="remove-product"
              onClick={ (target) => removeFromCart(target) }
            >
              Remover do Carrinho
            </button>
          </div>
        )) }
      </div>
    );
  }
}

CartList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()),
  removeFromCart: PropTypes.func.isRequired,
  addOne: PropTypes.func.isRequired,
  removeOne: PropTypes.func.isRequired,
};

CartList.defaultProps = {
  products: [],
};
