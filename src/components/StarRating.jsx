import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class StarRating extends Component {
  render() {
    const { handler, id, star } = this.props;
    return (
      <li
        data-testid={ `${id}-rating` }
        id={ id }
        className={ `starIcon ${star ? 'active' : ''} ` }
        onClickCapture={ (event) => handler(event) }
      />
    );
  }
}

StarRating.propTypes = {
  handler: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  star: PropTypes.bool.isRequired,
};
