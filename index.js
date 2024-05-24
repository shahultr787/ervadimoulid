const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3200;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to download a zip file from the server
app.get('/download', (req, res) => {
  const zipFilePath = path.join(__dirname, 'dwn.zip'); // Path to your zip file

  // Validate if the file exists
  if (!fs.existsSync(zipFilePath)) {
    return res.status(404).json({ message: 'File not found' });
  }

  // Set the response headers to prompt the user to download the file
  res.download(zipFilePath, 'dwn.zip', (err) => {
    if (err) {
      console.error('Error downloading the file:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
