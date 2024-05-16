const express = require('express');
const app = express();
const port = 3000;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Define route to fetch movies with pagination
app.get('/movies', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const offset = (page - 1) * pageSize;

    const totalCount = await prisma.movie.count();
    const totalPages = Math.ceil(totalCount / pageSize);

    const movies = await prisma.movie.findMany({
      skip: offset,
      take: pageSize,
    });

    res.render('movies', { movies, page, pageSize, totalCount, totalPages });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/movies`);
});
