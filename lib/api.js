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
 * @returns {Promise<Object>} A promise that resolves to the product data
 * @throws {Error} If the API request fails
 */
export const getProducts = cache(
  async ({ page = 1, limit = 20, sortBy = "id", order = "asc", category }) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      order,
    });

    if (category) params.append("category", category);

    const response = await fetch(`/api/products?${params}`, {
      next: { revalidate: 60 }, // Revalidating every 60 seconds
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  }
);

/**
 * Fetch all available categories
 * This function is wrapped with React's cache function for automatic memoization
 * @returns {Promise<string[]>} A promise that resolves to an array of category names
 * @throws {Error} If the API request fails
 */
export const getCategories = cache(async () => {
  const response = await fetch("/api/categories", {
    next: { revalidate: 3600 }, // Revalidating every hour
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
});
