const baseURL = 'https://api.mercadolibre.com/';

export async function getCategories() {
  const data = await fetch(`${baseURL}sites/MLB/categories`);
  const obj = await data.json();
  return obj;
}

export async function getProductsFromCategoryAndQuery(catId, query) {
  const data = await fetch(`${baseURL}sites/MLB/search?category=${catId}&q=${query}`);
  const obj = await data.json();
  return obj;
}

export async function getProductFromId(productId) {
  const data = await fetch(`${baseURL}items/${productId}`);
  const obj = await data.json();
  return obj;
}
