const saveLocalState = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadLocalState = (key) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    localStorage.setItem(key, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(key));
};

export {
  saveLocalState,
  loadLocalState,
};
