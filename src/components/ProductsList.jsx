import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import ProductItem from './ProductItem';

export default class ProductsList extends Component {
  render() {
    const { products, addToCart } = this.props;

    if (!products.length) return <h2>Nenhum produto foi encontrado</h2>;

    return (
      <div>
        { products.map((product) => (
          <div
            key={ product.id }
            data-testid="product"
          >
            <figure>
              <img src={ product.thumbnail } alt={ product.title } />
            </figure>
            <div>
              <h1>{ product.title }</h1>
            </div>
            <div>
              <span>R$</span>
              <span>{ product.price }</span>
            </div>
            <button
              type="button"
              name={ product.id }
              data-testid="product-add-to-cart"
              onClick={ ({ target }) => addToCart(target) }
            >
              Adicionar ao Carrinho
            </button>
          </div>
        )) }
      </div>
    );
  }
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addToCart: PropTypes.func.isRequired,
};
