const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 3100;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to create a category
app.post('/categories', async (req, res) => {
  try {
    // Read the existing database file
    const data = await fs.readFile('db.json', 'utf-8');
    const db = JSON.parse(data);

    // Extract category details from the request body
    const { name, image } = req.body;

    // Create a new category object
    const newCategory = { name, image };

    // Add the new category to the posts array
    db.posts.push(newCategory);

    // Write the updated database back to the file
    await fs.writeFile('db.json', JSON.stringify(db, null, 2));

    // Respond with success message
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error('Error adding category:', error);
    // Respond with error message
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
