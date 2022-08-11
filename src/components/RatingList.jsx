import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class RatingList extends Component {
  render() {
    const { rating } = this.props;
    const { starArr, email, comment } = rating;
    return (
      <div className="divDisabled">
        <h3>{email}</h3>
        <p>{comment}</p>
        <ul className="evaluation">
          { starArr.map((e, i) => (
            <li
              key={ i }
              className={ `starIcon ${e ? 'active' : ''} ` }
            />
          )) }
        </ul>
      </div>
    );
  }
}

RatingList.propTypes = {
  rating: PropTypes.shape({
    starArr: PropTypes.arrayOf(
      PropTypes.bool,
    ),
    email: PropTypes.string,
    comment: PropTypes.string,
  }),
};

RatingList.defaultProps = {
  rating: {},
};
