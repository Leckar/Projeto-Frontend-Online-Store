import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CategoryItem extends Component {
  render() {
    const { name } = this.props;
    return (
      <button data-testid="category" type="reset">
        <h4>{ name }</h4>
      </button>
    );
  }
}

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
};
