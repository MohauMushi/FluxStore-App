async function getProducts(page = 1, limit = 20) {
	const skip = (page - 1) * limit
	const response = await fetch(`https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=${limit}`)
	if (!response.ok) {
	    throw new Error("Failed to fetch products");
    }
	return response.json();
}

async function getProduct(id) {
  const response = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
	if (!response.ok) {
		throw new Error("Failed to fetch product");
	}
	return await response.json();
}

export { getProducts, getProduct };
