import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import CategoryList from '../components/CategoryList';
import ProductsList from '../components/ProductsList';

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
      this.setState({ categories, render: false });
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

  addToCartButtonClick = (target) => {
    const { key } = target;
    const { products, cartList } = this.state;
    const isInCart = cartList.some(({ id }) => id === key);
    if (isInCart) {
      cartList.forEach((i) => {
        if (i.id === key) {
          i.cartAmount += 1;
        }
      });
    }
    const newCartItem = products.find(({ id }) => id === key);
    this.setState((prev) => ({ cartList: [...prev, { ...newCartItem, cartAmount: 1 }] }));
  }

  render() {
    const { categories, searchQuery, products, render } = this.state;

    return (
      <div>
        <div>
          <input
            type="text"
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
            Buscar
          </button>
        </div>

        {!searchQuery.length && (
          <span data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </span>
        )}

        <CategoryList
          categoriesList={ categories }
          categoriesCall={ this.categoriesCall }
        />

        {render && <ProductsList
          products={ products }
          addToCart={ this.addToCartButtonClick }
        />}

        <Link to="/cart" data-testid="shopping-cart-button">
          <button type="submit">Carrinho</button>
        </Link>
      </div>
    );
  }
}
