const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

// In-memory product "database"
let products = [
  { id: 1, name: 'Laptop', price: 80000, description: 'High performance laptop' },
  { id: 2, name: 'Phone', price: 30000, description: 'Smartphone with great camera' },
  { id: 3, name: 'Headphones', price: 5000, description: 'Noise cancelling headphones' },
];

// GET /products – List all products
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// GET /products/:id – Get a specific product
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.status(200).json(product);
});

// POST /products – Create a new product
app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /products/:id – Update a product
app.put('/products/:id', (req, res) => {
  const { name, price, description } = req.body;
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;

  res.status(200).json(product);
});

// DELETE /products/:id – Delete a product
app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json({ error: 'Product not found' });

  const deletedProduct = products.splice(productIndex, 1);
  res.status(200).json({ message: 'Product deleted', product: deletedProduct[0] });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
