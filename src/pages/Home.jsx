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
    const { name } = target;
    const { products, cartList } = this.state;
    console.log(products);
    const isInCart = cartList.some(({ id }) => id === name);
    console.log(isInCart);
    if (isInCart) {
      const copy = cartList.find(({ id }) => id === name);
      copy.cartAmount += 1;
      const other = cartList.filter(({ id }) => id !== name);
      return this.setState({ cartList: [...other, copy] });
    }
    const newCartItem = products.find(({ id }) => id === name);
    console.log(newCartItem);
    this.setState((prev) => ({
      cartList: [...prev.cartList, { ...newCartItem, cartAmount: 1 }],
    }));
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
