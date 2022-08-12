import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CategoryList from '../components/CategoryList';
import ProductsList from '../components/ProductsList';
import CartIcon from '../components/CartIcon';
import { saveLocalState, loadLocalState } from '../services/StorageHandler';

export default class Home extends Component {
  state = {
    searchQuery: '',
    categories: [],
    products: [],
    render: false,
    cartList: [],
    storageKey: 'cart',
  };

  // teste

  componentDidMount() {
    this.setState(async () => {
      const { storageKey } = this.state;
      const categories = await getCategories();
      const cartList = loadLocalState(storageKey);
      this.setState({ categories, cartList });
    });
  }

  onChangeHandler = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onSearchButtonClick = async () => {
    const { searchQuery } = this.state;
    const { results: products } = await getProductsFromCategoryAndQuery(
      '',
      searchQuery,
    );
    this.setState({ products, render: true });
  };

  categoriesCall = async (categoryId) => {
    const { results: products } = await getProductsFromCategoryAndQuery(
      categoryId,
      '',
    );
    this.setState({ products, render: true });
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

  handleAddCartItem = (productId, cartList) => {
    const { products } = this.state;
    const newCartItem = products.find(({ id }) => id === productId);
    cartList.push({ ...newCartItem, cartAmount: 1 });

    this.setState({ cartList }, this.saveCartListInLocalStorage);
  }

  handleAddToCart = ({ target }) => {
    const { cartList: prevCartList } = this.state;
    const cartList = [...prevCartList];
    const productId = target.getAttribute('data-productid');
    const isInCart = cartList.some(({ id }) => id === productId);

    if (isInCart) this.handleAddCartItemAmount(productId, cartList);
    else this.handleAddCartItem(productId, cartList);
  }

  // getTotalQuantity = () => {
  //   const { cartList } = this.state;
  //   return cartList.reduce((total, item) => total + item.cartAmount, 0);
  // }

  render() {
    const { categories, searchQuery, products, render, cartList } = this.state;

    return (
      <div className="mainHome">
        <header>
          <h1 className="mainTitle">Front-End Online Store</h1>
          <input
            type="text"
            className="searchInput"
            data-testid="query-input"
            name="searchQuery"
            value={ searchQuery }
            onChange={ this.onChangeHandler }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.onSearchButtonClick }
          >
            <i className="fa fa-search" />
          </button>
          <Link to="/cart" data-testid="shopping-cart-button">
            <CartIcon cartListQuantity={ cartList.length } />
          </Link>
        </header>
        {!searchQuery.length && (
          <h2 className="initialMsg" data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        )}
        <div className="mainContent">
          <CategoryList
            categoriesList={ categories }
            categoriesCall={ this.categoriesCall }
          />
          {render
            && <ProductsList
              products={ products }
              cartButton={ this.handleAddToCart }
            />}
        </div>
      </div>
    );
  }
}
