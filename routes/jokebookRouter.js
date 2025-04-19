// routes/jokebookRouter.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/jokebookController');

router.get('/jokebook/categories',     ctrl.listCategories);
router.get('/jokebook/joke/:category', ctrl.listJokesByCategory);
router.get('/jokebook/random',         ctrl.randomJoke);
router.post('/jokebook/joke/add',      ctrl.addJoke);

module.exports = router;
