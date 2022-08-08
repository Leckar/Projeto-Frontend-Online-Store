import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import CategoryList from '../components/CategoryList';
import ProductsList from '../components/ProductsList';
import { saveLocalState, loadLocalState } from '../services/StorageHandler';
// saveSessionState, loadSessionState

export default class Home extends Component {
  state = {
    searchQuery: '',
    categories: [],
    products: [],
    render: false,
    cartList: [],
  };

  componentDidMount() {
    this.setState(async () => {
      const categories = await getCategories();
      const cartList = loadLocalState();
      // const products = loadSessionState();
      // if (products.length > 0) this.setState({ products });
      this.setState({ categories, render: false, cartList });
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
    // saveSessionState(products);
    this.setState({ products, render: true });
  };

  categoriesCall = async (categoryId) => {
    const { results: products } = await getProductsFromCategoryAndQuery(
      categoryId,
      '',
    );
    // saveSessionState(products);
    this.setState({ products, render: true });
  };

  addToCartButtonClick = ({ target }) => {
    const { name } = target;
    const { products, cartList } = this.state;
    const isInCart = cartList.some(({ id }) => id === name);
    if (isInCart) {
      const copy = cartList.find(({ id }) => id === name);
      copy.cartAmount += 1;
      const other = cartList.filter(({ id }) => id !== name);
      return this.setState({ cartList: [...other, copy] }, () => {
        saveLocalState(cartList);
      });
    }
    const newCartItem = products.find(({ id }) => id === name);
    this.setState((prev) => ({
      cartList: [...prev.cartList, { ...newCartItem, cartAmount: 1 }],
    }), () => {
      saveLocalState(cartList);
    });
  }

  render() {
    const { categories, searchQuery, products, render } = this.state;
    return (
      <div className="mainHome">
        <header>
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
            <button type="button">
              <i className="fa fa-shopping-cart" />
            </button>
          </Link>
        </header>
        {!searchQuery.length && (
          <h2 className="initialMsg" data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        )}

        <CategoryList
          categoriesList={ categories }
          categoriesCall={ this.categoriesCall }
        />

        {render && <ProductsList
          cart={ false }
          products={ products }
          cartButton={ this.addToCartButtonClick }
        />}
      </div>
    );
  }
}
