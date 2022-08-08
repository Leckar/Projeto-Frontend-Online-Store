import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductItem from './ProductItem';

export default class ProductsList extends Component {
  render() {
    const { products } = this.props;

    if (!products.length) return <h2>Nenhum produto foi encontrado</h2>;

    return (
      <div>
        { products.map((product) => (
          <ProductItem
            key={ product.id }
            productDetails={ product }
          />
        )) }
      </div>
    );
  }
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
