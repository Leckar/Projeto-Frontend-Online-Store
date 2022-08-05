import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductsRender extends Component {
  render() {
    const { productList } = this.props;

    const renderList = () => (
      productList.map((item, index) => (
        <li key={ index } data-testid="product">
          <p>{item.name}</p>
          <img src={ item.thumbnail } alt="" />
          <p>{item.price}</p>
        </li>
      ))
    );

    const listItensRender = renderList();

    return (
      <div>
        <ul>
          {listItensRender}
        </ul>
      </div>
    );
  }
}

ProductsRender.propTypes = {
  productList: PropTypes.shape().isRequired,
};
