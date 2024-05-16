// index.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 7777;
const prisma = new PrismaClient();
app.set('view engine', 'ejs');
app.use(express.json());

// Route to add a new movie
app.post('/', async (req, res) => {
  try {
    const { title, releaseYear, Actor, director, genre, rating } = req.body;

    const newMovie = await prisma.movie.create({
      data: {
        title,
        releaseYear,
        Actor,
        director,
        genre,
        rating,
      },
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/', async (req, res) => {
    try {
        // Parsing query parameters for sorting, filtering, pagination, and indexing
        const { sortBy, sortOrder, filterBy, pageNumber, pageSize } = req.query;

        // Default values for pagination
        const page = pageNumber ? parseInt(pageNumber, 10) : 1;
        const size = pageSize ? parseInt(pageSize, 10) : 10;
        const skip = (page - 1) * size;

        // Prisma query builder for movies
        const moviesQuery = {
            orderBy: sortBy ? { [sortBy]: sortOrder || 'asc' } : undefined,
            where: filterBy ? { title: { contains: filterBy } } : undefined,
            skip: skip,
            take: size
        };

        // Fetch movies from the database based on the query
        const movies = await prisma.movie.findMany(moviesQuery);

        // Count total number of movies for pagination
        const totalCount = await prisma.movie.count({ where: moviesQuery.where });

        // Prepare response object with movies and pagination information
        const response = {
            movies: movies,
            pagination: {
                currentPage: page,
                pageSize: size,
                totalCount: totalCount,
                totalPages: Math.ceil(totalCount / size)
            }
        };

        // Send back the response
        res.json(response);
    } catch (error) {
        // If an error occurs, log it and send an internal server error response
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route to handle GET requests with sorting
// Route to handle GET requests with sorting by movie name
// Route to handle GET requests with sorting by movie name
app.get('/movies/sorted', async (req, res) => {
    try {
        // Fetch movies from the database and sort them by title in ascending order
        const movies = await prisma.movie.findMany({
            orderBy: {
                title: 'asc'
            }
        });

        // Send back the response
        res.json(movies);
    } catch (error) {
        // If an error occurs, log it and send an internal server error response
        console.error('Error fetching sorted movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    // Route to handle GET requests with pagination for movies
// Route to handle GET requests with pagination for movies
app.get('/', async (req, res) => {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 10;
    const skip = (pageNumber - 1) * size;

    try {
        // Fetch movies from the database based on pagination parameters
        const movies = await prisma.movie.findMany({
            take: size,
            skip: skip
        });

        // Send back only the movies as the response
        res.json(movies);
    } catch (error) {
        // If an error occurs, log it and send an internal server error response
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });