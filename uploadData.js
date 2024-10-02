import { products, categories } from "./data.js";
import { db } from "./lib/firebaseConfig.js";
import { doc, setDoc, getDoc } from "firebase/firestore";

async function uploadProducts(products) {
  try {
    // Loop through the products array
    for (const product of products) {
      // Pad the product's ID with leading zeros (assuming max 3 digits)
      const paddedId = product.id.toString().padStart(3, "0");
      // Use the padded ID as the document ID
      const productRef = doc(db, "products", paddedId);

      // Check if document already exists
      const docSnap = await getDoc(productRef);
      if (docSnap.exists()) {
        console.log(`Product ${paddedId} already exists, skipping...`);
        continue;
      }

      // Upload the product data to Firestore
      await setDoc(productRef, product);
      console.log(`Document written with ID: ${paddedId}`);
    }
    console.log("All products uploaded successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

async function uploadCategories(categories) {
  try {
    console.log(`Starting upload of categories...`);
    // Create a reference to the 'categories' document
    const categoriesRef = doc(db, "categories", "allCategories");
    // Save the categories array in the document
    await setDoc(categoriesRef, { categories });
    console.log("Categories uploaded successfully!");
  } catch (error) {
    console.error("Error uploading categories: ", error);
  }
}

async function main() {
  try {
    await uploadProducts(products);
    await uploadCategories(categories);
    console.log("All data uploaded successfully!");
  } catch (error) {
    console.error("Failed to upload all data:", error);
    process.exit(1);
  }
}

main();
