const apiUrl = "https://fakestoreapi.com/products";
const productContainer = document.getElementById('productContainer');

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    let productHTML = '';
    data.forEach(product => {
      productHTML += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${product.category}</p>
          <p>$${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      `;
    });
    productContainer.innerHTML = productHTML;
  });

// Cart functionality
function addToCart(productId) {
  // Fetch product and save to localStorage
}


document.addEventListener("DOMContentLoaded", async () => {
  const productContainer = document.getElementById('productContainer');
  
  // Fetch product data
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  // Display products
  const displayProducts = (products) => {
    productContainer.innerHTML = ''; // Clear existing products

    products.forEach(product => {
      const productCard = `
        <div class="card">
          <img src="${product.image}" alt="${product.title}">
          <div class="card-content">
            <h3>${product.title}</h3>
            <p>${product.price}</p>
            <p>${product.category}</p>
          </div>
          <div class="card-footer">
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      `;
      productContainer.innerHTML += productCard;
    });
  };

  displayProducts(products);

  // Add functionality for searching
  document.getElementById('searchBar').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
    displayProducts(filteredProducts);
  });

  // Add functionality for filtering by category
  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    const category = e.target.value;
    const filteredProducts = category ? 
      products.filter(product => product.category.toLowerCase() === category.toLowerCase()) :
      products;
    displayProducts(filteredProducts);
  });
});



document.addEventListener("DOMContentLoaded", async () => {
  const productContainer = document.getElementById('productContainer');
  
  // Fetch product data
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  
  // Display products
  const displayProducts = (products) => {
    productContainer.innerHTML = ''; // Clear existing products
    
    // Check if products array is empty
    if (products.length === 0) {
      productContainer.innerHTML = "<p>No products found</p>";
      return;
    }

    // Loop through each product and create HTML for each product card
    products.forEach(product => {
      const productCard = `
        <div class="card">
          <img src="${product.image}" alt="${product.title}">
          <div class="card-content">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <p>${product.category}</p>
          </div>
          <div class="card-footer">
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      `;
      productContainer.innerHTML += productCard;
    });
  };

  // Initially display all products
  displayProducts(products);

  // Add functionality for searching products by name
  document.getElementById('searchBar').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase(); // Get the query from the search bar
    
    // Filter products by name
    const filteredProducts = products.filter(product => 
      product.title.toLowerCase().includes(query)
    );

    // Display the filtered products
    displayProducts(filteredProducts);
  });

  // Add functionality for filtering by category
  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    const category = e.target.value;
    const filteredProducts = category ? 
      products.filter(product => product.category.toLowerCase() === category.toLowerCase()) :
      products;
    displayProducts(filteredProducts);
  });
});
