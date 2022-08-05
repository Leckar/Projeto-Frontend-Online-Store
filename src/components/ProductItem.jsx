import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ProductItem extends Component {
  render() {
    const {
      productDetails: {
        title,
        price,
        thumbnail,
      },
    } = this.props;

    return (
      <div data-testid="product">
        <figure>
          <img src={ thumbnail } alt={ title } />
        </figure>
        <div>
          <h1>{ title }</h1>
        </div>
        <div>
          <span>R$</span>
          <span>{ price }</span>
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  productDetails: PropTypes.shape().isRequired,
};
