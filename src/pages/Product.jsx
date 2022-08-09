import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductFromId } from '../services/api';

export default class Product extends Component {
  state = {
    title: '',
    price: '',
    thumbnail: '',
  }

  componentDidMount() {
    this.loadProductInfo();
  }

  loadProductInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const {
      title,
      price,
      thumbnail,
    } = await getProductFromId(id);

    this.setState({ title, price, thumbnail });
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
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
