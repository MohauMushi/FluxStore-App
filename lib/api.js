import { cache } from "react";

/**
 * Fetch products with advanced filtering, sorting, and pagination
 * This function is wrapped with React's cache function for automatic memoization
 * @param {Object} options - The options for fetching products
 * @param {number} [options.page=1] - The page number to fetch
 * @param {number} [options.limit=20] - The number of products per page
 * @param {string} [options.sortBy='id'] - The field to sort by
 * @param {string} [options.order='asc'] - The sort order ('asc' or 'desc')
 * @param {string} [options.category] - The category to filter by
 * @param {string} [options.search] - The search term to filter by product title
 * @returns {Promise<Object>} A promise that resolves to the product data
 * @throws {Error} If the API request fails
 */
export const getProducts = cache(
  async ({
    page = 1,
    limit = 20,
    sortBy = "id",
    order = "asc",
    category,
    search,
  }) => {
    const skip = (page - 1) * limit;
    let url = `https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=${limit}`;

    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 60 }, // Revalidating every 60 seconds
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }
);

/**
 * Fetch a single product by its ID from the API.
 * This function is wrapped with React's cache function for automatic memoization
 * @param {string|number} id - The ID of the product to fetch
 * @returns {Promise<Object>} A promise that resolves to the product data
 * @throws {Error} If the API request fails
 */
export const getProduct = cache(async (id) => {
  const response = await fetch(
    `https://next-ecommerce-api.vercel.app/products/${id}`,
    {
      next: { revalidate: 300 }, // Revalidating every 5 minutes
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
});

/**
 * Fetch all available categories
 * This function is wrapped with React's cache function for automatic memoization
 * @returns {Promise<string[]>} A promise that resolves to an array of category names
 * @throws {Error} If the API request fails
 */
export const getCategories = cache(async () => {
  const response = await fetch(
    `https://next-ecommerce-api.vercel.app/categories`,
    {
      next: { revalidate: 3600 }, // Revalidating every hour
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
});
