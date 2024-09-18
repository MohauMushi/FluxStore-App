/**
 * Fetching a list of products from the API.
 *
 * @param {number} [page=1] - The page number to fetch (default: 1)
 * @param {number} [limit=20] - The number of products per page (default: 20)
 * @returns {Promise<Object>} A promise that resolves to the product data
 * @throws {Error} If the API request fails
 */
async function getProducts({ page = 1, limit = 20, search }) {
  const skip = (page - 1) * limit;
  let url = `https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=${limit}`;

  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

/**
 * Fetch a single product by its ID from the API.
 *
 * @param {string|number} id - The ID of the product to fetch
 * @returns {Promise<Object>} A promise that resolves to the product data
 * @throws {Error} If the API request fails
 */
async function getProduct(id) {
  const response = await fetch(
    `https://next-ecommerce-api.vercel.app/products/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return await response.json();
}

export { getProducts, getProduct };
