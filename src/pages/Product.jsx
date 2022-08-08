import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Product extends Component {
  state = {
    title: '',
    price: '',
    thumbnail: '',
  }

  componentDidMount() {
    this.itemClick();
  }

  itemClick = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const { results } = await getProductsFromCategoryAndQuery('', id);
    const item = results.filter((product) => product.title === id);
    this.setState({
      title: item[0].title,
      price: item[0].price,
      thumbnail: item[0].thumbnail,
    });
  };

  render() {
    const { title, price, thumbnail } = this.state;

    return (
      <div data-testid="product">
        <figure>
          <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        </figure>
        <div>
          <h1 data-testid="product-detail-name">{title}</h1>
        </div>
        <div>
          <span>R$</span>
          <span data-testid="product-detail-price">{price}</span>
        </div>
        <Link to="/cart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Adicionar ao carrinho

          </button>
        </Link>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
