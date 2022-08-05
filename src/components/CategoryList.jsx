import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CategoryList extends Component {
  render() {
    const { categoriesList } = this.props;
    return (
      <div>
        <h3>Categorias: </h3>
        {categoriesList.map((category) => (
          <h4 key={ category }>{category}</h4>
        ))}
      </div>
    );
  }
}

CategoryList.propTypes = {
  categoriesList: PropTypes.shape().isRequired,
};
