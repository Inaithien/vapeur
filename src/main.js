const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const path = require('path');
const gameRoutes = require('./routes/GameRoutes');
const genreRoutes = require('./routes/GenreRoutes');
const publisherRoutes = require('./routes/PublisherRoutes');

// Initialize Express app
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Set Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));  // specify the views directory
hbs.registerPartials(path.join(__dirname, 'views', 'partials')); // Optional: Register partials
hbs.registerHelper('eq', function (a, b) {
  return a === b;
});
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Use Routes
app.use(gameRoutes);
app.use(genreRoutes);
app.use(publisherRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});