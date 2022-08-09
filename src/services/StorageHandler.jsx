if (!JSON.parse(localStorage.getItem('state'))) {
  localStorage.setItem('state', JSON.stringify([]));
}

if (!JSON.parse(sessionStorage.getItem('products'))) {
  sessionStorage.setItem('products', JSON.stringify([]));
}

const saveLocalState = (data) => {
  localStorage.setItem('state', JSON.stringify(data));
};

const loadLocalState = () => JSON.parse(localStorage.getItem('state'));

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
