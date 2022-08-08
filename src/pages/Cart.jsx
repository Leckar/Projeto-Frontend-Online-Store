import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductsList from '../components/ProductsList';
import { saveState, loadState } from '../services/LocalStorageHandler';

export default class Cart extends Component {
  state ={
    cartList: [],
  }

  componentDidMount() {
    const cartList = loadState();
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
        saveState(cartList);
      });
    }
    const other = cartList.filter(({ id }) => id !== name);
    this.setState({ cartList: [...other] }, () => {
      saveState(cartList);
    });
  }

  render() {
    const { cartList } = this.state;
    return (
      <div>

        { cartList.length === 0 ? (<h2>Nenhum produto foi encontrado</h2>) : (
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
