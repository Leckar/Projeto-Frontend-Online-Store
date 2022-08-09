import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductFromId } from '../services/api';
import { saveLocalState, loadLocalState } from '../services/StorageHandler';

export default class Product extends Component {
  state = {
    productDetail: {},
    storageKey: 'cart',
    cartList: [],
  }

  componentDidMount() {
    this.loadProductInfo();
    const { storageKey } = this.state;
    const cartList = loadLocalState(storageKey);
    this.setState({ cartList });
  }

  loadProductInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const productDetail = await getProductFromId(id);
    this.setState({ productDetail });
  };

  saveCartListInLocalStorage = () => {
    const { cartList, storageKey } = this.state;
    saveLocalState(storageKey, cartList);
  }

  handleAddCartItemAmount = (productId, cartList) => {
    const productIdsList = cartList.map(({ id }) => id);
    const productInIdsList = productIdsList.indexOf(productId);
    cartList.at(productInIdsList).cartAmount += 1;

    this.setState({ cartList }, this.saveCartListInLocalStorage);
  }

  handleAddCartItem = (cartList) => {
    const { productDetail } = this.state;
    cartList.push({ ...productDetail, cartAmount: 1 });

    this.setState({ cartList }, this.saveCartListInLocalStorage);
  }

  handleAddToCart = ({ target }) => {
    const { cartList: prevCartList } = this.state;
    const cartList = [...prevCartList];
    const productId = target.getAttribute('data-productid');
    const isInCart = cartList.some(({ id }) => id === productId);

    if (isInCart) this.handleAddCartItemAmount(productId, cartList);
    else this.handleAddCartItem(cartList);
  }

  render() {
    const { productDetail } = this.state;
    const { title, price, thumbnail, id } = productDetail;

    return (
      <main>
        <div data-testid="product">
        {/* <h1 className="mainTitle">Front-End Online Store</h1> */}
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
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            data-productid={ id }
            onClick={ (target) => this.handleAddToCart(target) }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <Link to="/cart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Ir ao carrinho
          </button>
        </Link>
      </main>
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
