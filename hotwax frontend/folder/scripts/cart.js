document.addEventListener("DOMContentLoaded", async () => {
    const productContainer = document.getElementById('productContainer');
    
    // Fetch product data
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    
    // Function to display products
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
  
    // Add to Cart functionality
    const addToCart = (productId) => {
      const cart = JSON.parse(localStorage.getItem('cart')) || []; // Get existing cart or initialize an empty array
      const product = products.find(product => product.id === productId);
  
      // Check if the product is already in the cart
      const existingProduct = cart.find(item => item.id === productId);
  
      if (existingProduct) {
        existingProduct.quantity += 1; // If the product is already in the cart, increase quantity
      } else {
        cart.push({ ...product, quantity: 1 }); // If not, add product with quantity 1
      }
  
      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.title} has been added to your cart`);
    };
  
    // Add event listener to each "Add to Cart" button
    productContainer.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
      }
    });
  });
  