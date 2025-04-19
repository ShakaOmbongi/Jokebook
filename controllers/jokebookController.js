// controllers/jokebookController.js
const fetch    = require('node-fetch');
const Category = require('../models/categoryModel');
const Joke     = require('../models/jokeModel');

exports.listCategories = async (req, res) => {
  try {
    const cats = await Category.getAll();
    res.json(cats);
  } catch {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

exports.listJokesByCategory = async (req, res) => {
  const { category } = req.params;
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

  try {
    // 1) Try local lookup
    const localCat = await Category.getByName(category);
    if (localCat) {
      const jokes = await Joke.getByCategory(category, limit);
      return res.json(jokes);
    }

    // 2) Not found locally → fetch from external JokeAPI
    const url = `https://v2.jokeapi.dev/joke/${encodeURIComponent(category)}?` +
                `type=twopart&amount=3` +
                `&blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;

    const apiRes = await fetch(url);
    const body   = await apiRes.json();

    if (body.error || !Array.isArray(body.jokes) || body.jokes.length === 0) {
      return res
        .status(404)
        .json({ error: 'Category not found locally or via external API' });
    }

    // 3) Insert new category locally
    const newCatId = await Category.add(category);

    // 4) Insert each fetched joke
    for (const j of body.jokes) {
      await Joke.add(newCatId, j.setup, j.delivery);
    }

    // 5) Return them as if local
    const inserted = await Joke.getByCategory(category, limit);
    res.json(inserted);

  } catch (err) {
    console.error('External fetch failed:', err);
    res.status(500).json({ error: 'Failed to fetch from external JokeAPI' });
  }
};

exports.randomJoke = async (req, res) => {
  try {
    const joke = await Joke.getRandom();
    res.json(joke);
  } catch {
    res.status(500).json({ error: 'Failed to fetch random joke' });
  }
};

exports.addJoke = async (req, res) => {
  const { category, setup, delivery } = req.body;
  if (!category || !setup || !delivery) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const cat = await Category.getByName(category);
    if (!cat) return res.status(400).json({ error: 'Invalid category' });

    await Joke.add(cat.id, setup, delivery);
    const jokes = await Joke.getByCategory(category);
    res.json(jokes);

  } catch {
    res.status(500).json({ error: 'Failed to add joke' });
  }
};
