const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// MongoDB connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'ippopay';

app.use(express.json());

app.post('/api/save', (req, res) => {
  const { username, password } = req.body;

  // Connect to MongoDB
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).json({ error: 'Failed to connect to MongoDB' });
      return;
    }

    const db = client.db(dbName);
    const collection = db.collection('users');

    // Insert the username and password into the collection
    collection.insertOne({ username, password, response }, (err, result) => {
      if (err) {
        console.error('Error saving record:', err);
        res.status(500).json({ error: 'Failed to save record' });
        return;
      }

      console.log('Record saved successfully');
      res.status(200).json({ message: 'Record saved successfully' });
    });

    client.close();
  });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });