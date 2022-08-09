import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadLocalState } from '../services/StorageHandler';

export default class Checkout extends Component {
  state = {
    cartList: [],
    btnIsDisabled: true,
    inputs: {},
    renderError: false,
  };

  componentDidMount() {
    const cartList = loadLocalState('cart');
    this.setState({ cartList });
  }

  renderResult = () => {
    const { btnIsDisabled } = this.state;
    if (btnIsDisabled) {
      this.setState({ renderError: true });
    } else {
      this.setState({ renderError: false }, () => {
        localStorage.clear();
        const { history } = this.props;
        history.push('./');
      });
    }
  }

  updateBtn = () => {
    const { inputs } = this.state;
    const arrOfInputs = Object.values(inputs);
    const MINIMUM = 7;
    if (arrOfInputs.length === MINIMUM) {
      const isBtnAvailable = arrOfInputs.every((input) => input.length > 0);
      this.setState({ btnIsDisabled: !isBtnAvailable });
    }
  }

  handleChange = ({ target }) => {
    const { inputs } = this.state;
    inputs[target.name] = target.value;
    this.setState({ inputs }, () => {
      this.updateBtn();
    });
  }

  render() {
    const { cartList, renderError } = this.state;
    return (
      <div className="checkoutWrap">
        {/* <h1 className="mainTitle">Front-End Online Store</h1> */}
        <div className="checkoutItensWrap">
          <h2>Revise seus produtos:</h2>
          {cartList.map((productInCart) => (
            <div key={ productInCart.id } className="productForCheckOut">
              <img src={ productInCart.thumbnail } alt={ productInCart.title } />
              <h3>{productInCart.title}</h3>
              <p>
                {`Valor: R$ ${productInCart.price} X ${productInCart.cartAmount}`}
              </p>
            </div>
          ))}
        </div>
        <div className="userDetails">
          {
            renderError
              && <h2 data-testid="error-msg">Campos inválidos</h2>
          }
          <h2>Informações do comprador</h2>
          <label htmlFor="fullName">
            <input
              data-testid="checkout-fullname"
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Nome Completo"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            <input
              data-testid="checkout-email"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cpf">
            <input
              data-testid="checkout-cpf"
              type="text"
              name="cpf"
              id="cpf"
              placeholder="CPF"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="phone">
            <input
              data-testid="checkout-phone"
              type="tel"
              name="phone"
              id="phone"
              placeholder="Telefone"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cep">
            <input
              data-testid="checkout-cep"
              type="text"
              name="cep"
              id="cep"
              placeholder="CEP"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="address">
            <input
              data-testid="checkout-address"
              type="text"
              name="address"
              id="address"
              placeholder="Endereço"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div className="radioWrap">
          <h2>Método de pagamento</h2>
          <label htmlFor="ticketPayment">
            <p>Boleto</p>
            <input
              data-testid="ticket-payment"
              type="radio"
              name="payment"
              id="ticketPayment"
              value="ticket"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="visaPayment">
            <p>Visa</p>
            <input
              data-testid="visa-payment"
              type="radio"
              name="payment"
              id="visaPayment"
              value="visa"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="masterPayment">
            <p>MasterCard</p>
            <input
              data-testid="master-payment"
              type="radio"
              name="payment"
              id="masterPayment"
              value="master"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="eloPayment">
            <p>Elo</p>
            <input
              data-testid="elo-payment"
              type="radio"
              name="payment"
              id="eloPayment"
              value="elo"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <button
          onClick={ this.renderResult }
          type="button"
          data-testid="checkout-btn"
        >
          Finalizar compra
        </button>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape().isRequired,
};
