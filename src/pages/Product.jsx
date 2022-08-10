import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductFromId } from '../services/api';
import { saveLocalState, loadLocalState } from '../services/StorageHandler';
import '../styles/Product.css';

export default class Product extends Component {
  state = {
    productDetail: {},
    storageKey: 'cart',
    cartList: [],
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
    this.loadProductInfo();
    const { storageKey } = this.state;
    const cartList = loadLocalState(storageKey);
    this.setState({ cartList });
  }

  onImputChange = (event) => {
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

  loadProductInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const productDetail = await getProductFromId(id);
    this.setState({ productDetail });
  };

  saveCartListInLocalStorage = () => {
    const { cartList, storageKey } = this.state;
    saveLocalState(storageKey, cartList);
  }

  handleAddCartItemAmount = (productId, cartList) => {
    const productIdsList = cartList.map(({ id }) => id);
    const productInIdsList = productIdsList.indexOf(productId);
    cartList.at(productInIdsList).cartAmount += 1;

    this.setState({ cartList }, this.saveCartListInLocalStorage);
  }

  handleAddCartItem = (cartList) => {
    const { productDetail } = this.state;
    cartList.push({ ...productDetail, cartAmount: 1 });

    this.setState({ cartList }, this.saveCartListInLocalStorage);
  }

  handleAddToCart = ({ target }) => {
    const { cartList: prevCartList } = this.state;
    const cartList = [...prevCartList];
    const productId = target.getAttribute('data-productid');
    const isInCart = cartList.some(({ id }) => id === productId);

    if (isInCart) this.handleAddCartItemAmount(productId, cartList);
    else this.handleAddCartItem(cartList);
  }

  render() {
    const { productDetail, star,
      rate, email, comentario, disbled } = this.state;
    const { title, price, thumbnail, id } = productDetail;

    return (
      <main>
        <div data-testid="product">
          {/* <h1 className="mainTitle">Front-End Online Store</h1> */}
          <figure>
            <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
          </figure>
          <div>
            <h1 data-testid="product-detail-name">{title}</h1>
          </div>
          <div>
            <span>R$</span>
            <span data-testid="product-detail-price">{price}</span>
          </div>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            data-productid={ id }
            onClick={ (target) => this.handleAddToCart(target) }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <Link to="/cart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Ir ao carrinho
          </button>
        </Link>
        <h1>Avaliação</h1>
        <form action="">
          <input
            value={ email }
            name="email"
            type="text"
            placeholder="email"
            data-testid="product-detail-email"
            onChange={ this.onImputChange }
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
            onChange={ this.onImputChange }
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
      </main>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
