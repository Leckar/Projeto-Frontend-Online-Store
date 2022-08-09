if (!JSON.parse(localStorage.getItem('cart'))) {
  localStorage.setItem('cart', JSON.stringify([]));
}

if (!JSON.parse(sessionStorage.getItem('products'))) {
  sessionStorage.setItem('products', JSON.stringify([]));
}

const saveLocalState = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadLocalState = (key) => JSON.parse(localStorage.getItem(key));

const saveSessionState = (data) => {
  sessionStorage.setItem('products', JSON.stringify(data));
};

const loadSessionState = () => JSON.parse(sessionStorage.getItem('products'));

export {
  saveLocalState,
  loadLocalState,
  saveSessionState,
  loadSessionState,
};
