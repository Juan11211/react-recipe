const express = require('express');
const recipeRouter = express.Router();
const Recipe = require('../models/Recipes');
require('dotenv').config();
const axios = require("axios");


// const apiKey = process.env.REACT_APP_API_KEY
// const randomrecipes = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;


// get Random Recipes from Api 
const options = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
  headers: {
    'X-RapidAPI-Key': 'd5e7e32e1bmshf7626b5698184d1p1a093fjsn53eb856e94ff',
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
  
    
module.exports = recipeRouter; 