import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductItem.css';

export default class ProductItem extends Component {
  render() {
    const {
      productDetails: {
        id,
        title,
        price,
        thumbnail,
        shipping: { free_shipping: freeShipping },
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
          { freeShipping && (
            <span
              data-testid="free-shipping"
            >
              Frete Grátis
            </span>) }
        </div>
      </Link>
    );
  }
}

ProductItem.propTypes = {
  productDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};
