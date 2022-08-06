import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CategoryItem extends Component {
  render() {
    const { name, categoriesFunc, id } = this.props;

    return (
      <div>
        <button
          data-testid="category"
          type="reset"
          onClick={ () => categoriesFunc(id) }
        >
          <h4>{name}</h4>
        </button>
      </div>
    );
  }
}

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  categoriesFunc: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
