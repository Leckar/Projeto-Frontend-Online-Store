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
      <div data-testid="product">
        {/* <Link to={ `/product/${title}` } data-testid="product-detail-link"> */}
          <figure>
            <img src={ thumbnail } alt={ title } />
          </figure>
          <div>
            <h1>{title}</h1>
          </div>
        {/* </Link> */}
        <div>
          <span>R$</span>
          <span>{price}</span>
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  productDetails: PropTypes.shape().isRequired,
};
