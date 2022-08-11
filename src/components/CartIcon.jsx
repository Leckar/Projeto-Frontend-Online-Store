import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CartIcon extends Component {
  render() {
    const { cartListQuantity } = this.props;
    return (
      <button type="button">
        <i className="fa fa-shopping-cart">
          <span id="quantity">
            <span data-testid="shopping-cart-size">{ cartListQuantity }</span>
          </span>
        </i>
      </button>
    );
  }
}

CartIcon.propTypes = {
  cartListQuantity: PropTypes.number.isRequired,
};
