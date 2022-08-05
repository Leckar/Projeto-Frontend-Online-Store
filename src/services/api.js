const baseURL = 'https://api.mercadolibre.com/sites/MLB/';

export async function getCategories() {
  const data = await fetch(`${baseURL}categories`);
  const obj = await data.json();
  return obj;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const data = await fetch(`${baseURL}search?category=${categoryId}&q=${query}`);
  const obj = await data.json();
  return obj;
}
