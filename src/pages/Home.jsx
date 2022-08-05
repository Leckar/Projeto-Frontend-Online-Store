import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CategoryList from '../components/CategoryList';
import ProductsList from '../components/ProductsList';

export default class Home extends Component {
  state = {
    searchQuery: '',
    categories: [],
    products: [],
  }

  componentDidMount() {
    this.setState(async () => {
      const categories = await getCategories();

      this.setState({ categories });
    });
  }

  onChangeHandler = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  onSearchButtonClick = async () => {
    const { searchQuery } = this.state;
    const { results: products } = await getProductsFromCategoryAndQuery('', searchQuery);

    this.setState({ products });
  }

  render() {
    const { categories, searchQuery, products } = this.state;

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

        {
          !searchQuery.length && (
            <span data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>
          )
        }

        <ProductsList products={ products } />

        <CategoryList categoriesList={ categories } />

        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <button type="submit">Carrinho</button>
        </Link>
      </div>
    );
  }
}
