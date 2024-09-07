async function getProducts() {
  const response = await fetch(`https://next-ecommerce-api.vercel.app/products`);
	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}
	return await response.json();
}

async function getProduct(id) {
  const response = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
	if (!response.ok) {
		throw new Error("Failed to fetch product");
	}
	return await response.json();
}

export { getProducts, getProduct };
