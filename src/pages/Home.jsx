import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CategoryList from '../components/CategoryList';
import ProductsRender from '../components/ProductsRender';

export default class Home extends Component {
  state = {
    categories: [],
    productList: [],
    render: false,
  }

  componentDidMount() {
    this.setState(async () => {
      const categories = await getCategories();
      this.setState({ categories });
    });
  }

  categoriesCall = async (name) => {
    console.log(name);
    const productListobj = await getProductsFromCategoryAndQuery(name);
    this.setState({ productList: productListobj.results, render: true });
  }

  render() {
    const { categories, productList, render } = this.state;
    return (
      <div>
        <span data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
        <CategoryList
          categoriesList={ categories }
          catergoriesCall={ this.categoriesCall }
        />

        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <button type="submit">Carrinho</button>
        </Link>
        <div>
          { render && <ProductsRender productList={ productList } /> }
        </div>

      </div>
    );
  }
}
