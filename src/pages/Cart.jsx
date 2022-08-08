import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductsList from '../components/ProductsList';
import { saveLocalState, loadLocalState } from '../services/StorageHandler';

export default class Cart extends Component {
  state ={
    cartList: [],
  }

  componentDidMount() {
    const cartList = loadLocalState();
    this.setState({ cartList });
  }

  removeFromCartButtonClick = ({ target }) => {
    const { name } = target;
    const { cartList } = this.state;
    const copy = cartList.find(({ id }) => id === name);
    if (copy && copy.cartAmount > 1) {
      copy.cartAmount -= 1;
      const other = cartList.filter(({ id }) => id !== name);
      return this.setState({ cartList: [...other, copy] }, () => {
        saveLocalState([...other, copy]);
      });
    }
    const other = cartList.filter(({ id }) => id !== name);
    this.setState({ cartList: [...other] }, () => {
      saveLocalState([...other]);
    });
  }

  render() {
    const { cartList } = this.state;
    return (
      <div>

        { !cartList || !cartList.length ? (
          <h2>Nenhum produto foi encontrado</h2>
        ) : (
          <ProductsList
            cart
            products={ cartList }
            cartButton={ this.removeFromCartButtonClick }
          />
        )}
        <Link
          to={ {
            pathname: '/',
          } }
          data-testid="home-button"
        >
          Voltar ao Início
        </Link>
      </div>
    );
  }
}

Cart.propTypes = {
  location: PropTypes.any,
}.isRequired;
