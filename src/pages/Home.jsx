import React, { Component } from 'react';
import CategoryList from '../components/CategoryList';
import { getCategories } from '../services/api';

export default class Home extends Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    this.setState(async () => {
      const categories = await getCategories();
      this.setState({ categories });
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <span data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>
        <CategoryList categoriesList={ categories } />
      </div>
    );
  }
}
