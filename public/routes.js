import initial from "/pages/initial.js";
import renderHome from "/pages/home.js";
import renderPlanets from "/pages/planets.js";
import renderLogin from "/pages/login.js";
import renderOption from "/pages/add_planet_recipe.js";
import renderAddPlanet from "/pages/addplanet.js";
import renderAddRecipe from "/pages/addrecipes.js";

export default async function Route(url, idPlanet, idRecipe) {
  
      if (url === "/") {
        initial()
      }

      if (url === '/home') {
        await renderHome()
      }
      
      if (url === '/login') {
        await renderLogin()
      }

      if (url === '/option') {
        await renderOption()
      }

      if (url === '/addPlanet') {
        await renderAddPlanet()
      }

      if (url === '/addRecipes') {
        await renderAddRecipe()
      }
      
      if(url.match(/planets/)){
        await renderPlanets(idPlanet, idRecipe)
      }
      
  }