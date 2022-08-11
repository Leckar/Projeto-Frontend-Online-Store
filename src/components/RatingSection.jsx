import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveLocalState, loadLocalState } from '../services/StorageHandler';
import RatingList from './RatingList';
import StarRating from './StarRating';

const reset = [false, false, false, false, false];

export default class RatingSection extends Component {
  state ={
    starArr: reset,
    clickedOn: false,
    email: '',
    comment: '',
    savedRatings: [],
    isInvalid: false,

  }

  componentDidMount() {
    const { id } = this.props;
    const savedRatings = loadLocalState(id);
    this.setState({ savedRatings });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  ratingOnClick = ({ target }) => {
    this.setState({ starArr: reset }, () => {
      const { starArr } = this.state;
      const index = target.id;
      const temp = Array(starArr.length).fill(false);
      temp[index - 1] = true;
      this.setState({ starArr: temp, clickedOn: true });
    });
  }

  bttnSubmitHandler = () => {
    const { clickedOn, email } = this.state;
    if (clickedOn === true && this.validateEmail(email) === true) {
      return this.setState({ isInvalid: false }, () => this.saveRatingInStorage());
    }
    this.setState({ isInvalid: true });
  }

  validateEmail = (email) => (/\S+@\S+\.\S+/).test(email);

  commentOverwrite = (newEmail) => {
    const { savedRatings } = this.state;
    return savedRatings.filter(({ email }) => email !== newEmail);
  }

  saveRatingInStorage = () => {
    const { email, comment, starArr } = this.state;
    const rating = {
      email,
      comment,
      starArr,
    };
    const savedRatings = [...this.commentOverwrite(email), rating];
    this.setState({
      savedRatings,
      email: '',
      comment: '',
      starArr: reset,
      clickedOn: false,
      bttnIsDisabled: true,
    }, () => {
      const { savedRatings: newList } = this.state;
      const { id } = this.props;
      saveLocalState(id, newList);
    });
  }

  render() {
    const { email, comment, bttnIsDisabled,
      savedRatings, isInvalid, starArr } = this.state;
    return (
      <div>
        <h2>Avaliação</h2>
        <form>
          <input
            value={ email }
            name="email"
            type="text"
            placeholder="email"
            data-testid="product-detail-email"
            onChange={ this.onInputChange }
          />
          <ul className="avaliação">
            { starArr.map((e, i) => (
              <StarRating
                key={ i }
                star={ e }
                handler={ this.ratingOnClick }
                id={ i + 1 }
              />
            )) }
          </ul>
          <br />
          <textarea
            value={ comment }
            name="comment"
            cols="30"
            rows="10"
            data-testid="product-detail-evaluation"
            onChange={ this.onInputChange }
          />
          <br />
          <button
            type="button"
            data-testid="submit-review-btn"
            disabled={ bttnIsDisabled }
            onClick={ this.bttnSubmitHandler }
          >
            Avaliar
          </button>
        </form>
        { isInvalid && (
          <span data-testid="error-msg">Campos inválidos</span>
        )}
        <h2>Avaliações</h2>
        { savedRatings.map((obj) => {
          console.log(obj);
          return <RatingList key={ obj.email } rating={ obj } />;
        }) }
      </div>
    );
  }
}

RatingSection.propTypes = {
  id: PropTypes.string.isRequired,
};
