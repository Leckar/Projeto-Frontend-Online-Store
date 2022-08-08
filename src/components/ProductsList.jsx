import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductItem from './ProductItem';

export default class ProductsList extends Component {
  render() {
    const { products, addToCart } = this.props;

    if (!products.length) return 'Nenhum produto foi encontrado';

    return (
      <div>
        { products.map((product) => (
          <ProductItem
            key={ product.id }
            addToCart={ addToCart }
            productDetails={ product }
          />
        )) }
      </div>
    );
  }
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addToCart: PropTypes.func.isRequired,
};
