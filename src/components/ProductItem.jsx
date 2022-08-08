import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductItem extends Component {
  render() {
    const {
      productDetails: {
        // id,
        title,
        price,
        thumbnail,
      },
    } = this.props;

    return (
      <Link
        to={ `/product/${title}` }
        data-testid="product-detail-link"
      >
        <div data-testid="product">
          <figure>
            <img src={ thumbnail } alt={ title } />
          </figure>
          <div>
            <h1>{title}</h1>
          </div>
          <div>
            <span>R$</span>
            <span>{price}</span>
          </div>
        </div>
      </Link>
    );
  }
}

ProductItem.propTypes = {
  productDetails: PropTypes.shape().isRequired,
};
