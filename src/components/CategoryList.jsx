import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CategoryItem from './CategoryItem';

export default class CategoryList extends Component {
  render() {
    const { categoriesList, catergoriesCall } = this.props;
    return (
      <aside>
        <h3>Categorias: </h3>
        {categoriesList.map((category) => (
          <CategoryItem
            key={ category.id }
            name={ category.name }
            categoriesFunc={ catergoriesCall }
          />
        ))}
      </aside>
    );
  }
}

CategoryList.propTypes = {
  categoriesList: PropTypes.shape().isRequired,
  catergoriesCall: PropTypes.func.isRequired,
};
