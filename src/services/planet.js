const dbPlanet = require("../repository/DB_planet");

exports.getPlanet = async () => {
  const planets = dbPlanet.planet;
  return planets; //repository
};

exports.getRecipe = async () => {
  const recipes = dbPlanet.recipe;
  console.log(recipes); //Vê o que tem
  return recipes; //repository
};
