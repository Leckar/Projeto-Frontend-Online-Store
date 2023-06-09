import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductFromId } from '../services/api';
import { saveLocalState, loadLocalState } from '../services/StorageHandler';
import RatingSection from '../components/RatingSection';
import '../styles/Product.css';

export default class Product extends Component {
  state = {
    productDetail: {},
    storageKey: 'cart',
    cartList: [],
    freeShipping: false,
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
    this.setState({ productDetail }, () => {
      const { productDetail: product } = this.state;
      const { shipping: { free_shipping: freeShipping } } = product;
      this.setState({ freeShipping });
    });
  };

  saveCartListInLocalStorage = () => {
    const { cartList, storageKey } = this.state;
    saveLocalState(storageKey, cartList);
  }

  handleAddCartItemAmount = (productId, cartList) => {
    const productIdsList = cartList.map(({ id }) => id);
    const productInIdsList = productIdsList.indexOf(productId);
    cartList[productInIdsList].cartAmount += 1;

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

  getTotalQuantity = () => {
    const { cartList } = this.state;
    return cartList.reduce((total, item) => total + item.cartAmount, 0);
  }

  render() {
    const { productDetail, freeShipping } = this.state;
    const { title, price, thumbnail, id } = productDetail;
    const { match: { params: { id: productId } } } = this.props;
    console.log(productDetail);

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
          { freeShipping && (
            <span
              data-testid="free-shipping"
            >
              Frete Grátis
            </span>) }
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
          <span className="fa fa-shopping-cart" data-testid="shopping-cart-size">
            {
              this.getTotalQuantity()
            }
          </span>
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Ir ao carrinho
          </button>
        </Link>
        <RatingSection id={ productId } />
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
