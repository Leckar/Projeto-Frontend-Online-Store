import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../components/ProductItem';

export default class Cart extends Component {
  render() {
    const { productsInCart } = this.props;

    if (!productsInCart.length) return <h2>Nenhum produto foi encontrado</h2>;

    return (
      <div>
        { productsInCart.map((product) => (
          <ProductItem
            key={ product.id }
            productDetails={ product }
          />
        )) }
      </div>
    );
  }
}

Cart.propTypes = {
  productsInCart: PropTypes.shape().isRequired,
};
