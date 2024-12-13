// Fetch product data and store it in localStorage
async function fetchAndStoreProducts() {
    // Fetch products from the API
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
  
    // Store products in localStorage
    localStorage.setItem("products", JSON.stringify(products));
  }
  
  // Call the function to fetch and store products when the page loads
  fetchAndStoreProducts();
  