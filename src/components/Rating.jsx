import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { saveLocalState, loadLocalState } from '../services/StorageHandler';

export default class Rating extends Component {
  state ={
    star: {
      starActive1: '',
      starActive2: '',
      starActive3: '',
      starActive4: '',
      starActive5: '',
    },
    rate: '',
    email: '',
    comentario: '',
    disbled: true,
  }

  componentDidMount() {
    // inserir a key que usará no localStorage
    const importData = loadLocalState('aKeyVaiAqui');
    // usar setState
  }

  onInputChange = (event) => {
    const { email } = this.state;
    const { name, value } = event.target;
    const emailValidation = this.validateEmail(email);
    this.setState({ [name]: value });
    this.validationButton(emailValidation);
  };

  avaliationClick1 = () => {
    this.setState({
      star: {
        starActive1: 'ativo',
        starActive2: '',
        starActive3: '',
        starActive4: '',
        starActive5: '',
      },
      rate: '1',
    });
  }

  avaliationClick2 = () => this.setState({
    star: {
      starActive1: '',
      starActive2: 'ativo',
      starActive3: '',
      starActive4: '',
      starActive5: '',
    },
    rate: '2',
  })

  avaliationClick3 = () => this.setState({
    star: {
      starActive1: '',
      starActive2: '',
      starActive3: 'ativo',
      starActive4: '',
      starActive5: '',
    },
    rate: '3',
  })

  avaliationClick4 = () => this.setState({
    star: {
      starActive1: '',
      starActive2: '',
      starActive3: '',
      starActive4: 'ativo',
      starActive5: '',
    },
    rate: '4',
  })

  avaliationClick5 = () => this.setState({
    star: {
      starActive1: '',
      starActive2: '',
      starActive3: '',
      starActive4: '',
      starActive5: 'ativo',
    },
    rate: '5',
  })

  validationButton = (email) => {
    const { star } = this.state;
    const starCheck = Object.keys(star).map((item) => (star[item]) === 'ativo');
    if (starCheck.includes(true) && email === true) {
      this.setState({ disbled: false });
    }
  }

  validateEmail = (item) => {
    const email = /\S+@\S+\.\S+/;
    return (email.test(item));
  }

  render() {
    const { star,
      rate, email, comentario, disbled } = this.state;
    return (
      <div>
        <h2>Avaliação</h2>
        <form action="">
          <input
            value={ email }
            name="email"
            type="text"
            placeholder="email"
            data-testid="product-detail-email"
            onChange={ this.onInputChange }
          />
          <ul className="avaliação">
            <li
              data-testid="1-rating"
              className={ `starIcon ${star.starActive1} ` }
              onClickCapture={ this.avaliationClick1 }
            />
            <li
              data-testid="2-rating"
              className={ `starIcon ${star.starActive2} ` }
              onClickCapture={ this.avaliationClick2 }
            />
            <li
              data-testid="3-rating"
              className={ `starIcon ${star.starActive3} ` }
              onClickCapture={ this.avaliationClick3 }
            />
            <li
              data-testid="4-rating"
              className={ `starIcon ${star.starActive4} ` }
              onClickCapture={ this.avaliationClick4 }
            />
            <li
              data-testid="5-rating"
              className={ `starIcon ${star.starActive5} ` }
              onClickCapture={ this.avaliationClick5 }
            />
          </ul>
          <span>{rate}</span>
          <br />
          <textarea
            value={ comentario }
            name="comentario"
            cols="30"
            rows="10"
            data-testid="product-detail-evaluation"
            onChange={ this.onInputChange }
          />
          <br />
          <button
            type="button"
            data-testid="submit-review-btn"
            disabled={ disbled }
            onClick={ this.renderFunc }
          >
            Avaliar
          </button>
        </form>
      </div>
    );
  }
}
