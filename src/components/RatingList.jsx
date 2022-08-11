import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class RatingList extends Component {
  render() {
    const { rating } = this.props;
    const { starArr, email, comment } = rating;
    // console.log(starArr.map((e) => <li key={ e }>esdasd</li>));
    return (
      <div className="divDisabled">
        <h3 data-testid="review-card-email">{email}</h3>
        <p data-testid="review-card-evaluation">{comment}</p>
        <ul data-testid="review-card-rating" className="evaluation">
          { starArr
            && starArr.map((e, i) => (
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
