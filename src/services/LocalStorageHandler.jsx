if (!JSON.parse(localStorage.getItem('state'))) {
  localStorage.setItem('state', JSON.stringify([]));
}

const saveState = (data) => {
  localStorage.setItem('state', JSON.stringify(data));
};

const loadState = () => JSON.parse(localStorage.getItem('state'));

export {
  saveState,
  loadState,
};
