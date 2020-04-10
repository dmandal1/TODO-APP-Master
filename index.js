const express = require('express');
const app = express();
const db = require('./config/db');
const port = process.env.PORT || 8000;
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'dist', 'client')));
app.use('/', require('./routes/index'));

app.listen(port, err => {
   if (!err) {
      console.log('Server is up and running on port: ${port}');
   }
});
