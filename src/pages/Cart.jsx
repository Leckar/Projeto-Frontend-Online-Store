import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartList from '../components/CartList';
import { saveLocalState, loadLocalState } from '../services/StorageHandler';

const attribute = 'data-productid';
export default class Cart extends Component {
  state ={
    cartList: [],
  }

  componentDidMount() {
    const cartList = loadLocalState('cart');
    this.setState({ cartList });
  }

  saveCartListInLocalStorage = () => {
    const { cartList } = this.state;
    saveLocalState('cart', cartList);
  }

  handleSubCartItemAmount = (productId, cartList) => {
    const productIdsList = cartList.map(({ id }) => id);
    const productInIdsList = productIdsList.indexOf(productId);
    cartList[productInIdsList].cartAmount -= 1;

    this.setState({ cartList }, this.saveCartListInLocalStorage);
  }

  handleSubCartItem = (productId, cartList) => {
    const newCartList = cartList.filter(({ id }) => id !== productId);

    this.setState({ cartList: newCartList }, this.saveCartListInLocalStorage);
  }

  handleSubtractFromCart = ({ target }) => {
    const { cartList: prevCartList } = this.state;
    const cartList = [...prevCartList];
    const productId = target.getAttribute(attribute);
    const { cartAmount } = cartList.find(({ id }) => id === productId);
    if (cartAmount > 1) this.handleSubCartItemAmount(productId, cartList);
  }

  removeFromCart = ({ target }) => {
    const { cartList: prevCartList } = this.state;
    const cartList = [...prevCartList];
    const productId = target.getAttribute(attribute);
    this.handleSubCartItem(productId, cartList);
  }

  handleAddCartItemAmount = (productId, cartList) => {
    const productIdsList = cartList.map(({ id }) => id);
    const productInIdsList = productIdsList.indexOf(productId);
    cartList[productInIdsList].cartAmount += 1;

    this.setState({ cartList }, this.saveCartListInLocalStorage);
  }

  handleAddToCart = ({ target }) => {
    const { cartList: prevCartList } = this.state;
    const cartList = [...prevCartList];
    const productId = target.getAttribute(attribute);
    const isInCart = cartList.some(({ id }) => id === productId);
    if (isInCart) this.handleAddCartItemAmount(productId, cartList);
  }

  render() {
    const { cartList } = this.state;
    return (
      <div>
        {/* <h1 className="mainTitle">Front-End Online Store</h1> */}
        { !cartList || !cartList.length ? (
          <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
        ) : (
          <div className="cartWrap">
            <CartList
              cart
              products={ cartList }
              removeFromCart={ this.removeFromCart }
              addOne={ this.handleAddToCart }
              removeOne={ this.handleSubtractFromCart }
            />
            {/* wm */}
            <h2 data-testid="shopping-cart-size">{ cartList.length }</h2>
            <Link
              to={ {
                pathname: '/checkout',
              } }
              data-testid="checkout-products"
            >
              Finalizar compra
            </Link>
          </div>
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
