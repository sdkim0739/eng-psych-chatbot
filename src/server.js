// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json());

app.use(cors()); // Enable CORS for all routes

app.post('/save-session', (req, res) => {
  const { participantId, interactions } = req.body;
  const fileName = `${participantId}.json`;
  const json = JSON.stringify(interactions, null, 2);
  fs.writeFile(fileName, json, (err) => {
    if (err) {
      console.error('Error saving session:', err);
      res.status(500).send('Error saving session');
    } else {
      console.log('Session saved successfully');
      res.send('Session saved successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
