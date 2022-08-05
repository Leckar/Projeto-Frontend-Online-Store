import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CategoryItem extends Component {
  render() {
    const { name, categoriesFunc } = this.props;

    return (
      <div>
        <button
          data-testid="category"
          type="reset"
          onClick={ () => categoriesFunc(name) }
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
};
