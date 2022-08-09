import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../styles/CartItem.css';

export default class CartItem extends Component {
  render() {
    const {
      productDetails: {
        id,
        title,
        price,
        thumbnail,
      },
    } = this.props;

    return (
      <Link
        to={ `/product/${id}` }
        data-testid="product-detail-link"
      >
        <div className="product" data-testid="product">
          <figure>
            <img src={ thumbnail } alt={ title } />
          </figure>
          <hr />
          <div>
            <h4 data-testid="shopping-cart-product-name">{title}</h4>
          </div>
          <hr />
          <div>
            <span>R$</span>
            <span>{price}</span>
          </div>
        </div>
      </Link>
    );
  }
}

CartItem.propTypes = {
  productDetails: PropTypes.shape().isRequired,
};
