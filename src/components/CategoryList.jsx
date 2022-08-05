import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import './CategoryList.css';

export default class CategoryList extends Component {
  render() {
    const { categoriesList } = this.props;
    return (
      <aside className="categoriesList">
        <h3>Categorias: </h3>
        {categoriesList.map((category) => (
          <CategoryItem key={ category.id } name={ category.name } />
        ))}
      </aside>
    );
  }
}

CategoryList.propTypes = {
  categoriesList: PropTypes.shape().isRequired,
};
