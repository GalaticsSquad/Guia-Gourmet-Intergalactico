import initial from "/pages/initial.js";
import { logicHeader } from "/pages/header.js";
import { renderHome, logicHome } from "/pages/home.js";
import { renderPlanets, logicPlanets } from "/pages/planets.js";
import { renderLogin, logicLogin } from "/pages/login.js";
// import recipe from "/pages/recipe.js";

import { add_planet_recipe, logicOption } from "/pages/add_planet_recipe.js";
import addPlanet from "/pages/addplanet.js";
import addRecipe from "/pages/addrecipes.js";

import { get_planets } from "./src/fetch/planet.js"
import { get_recipes } from "./src/fetch/recipes.js"


export default function Route() { 
  const dados  =  Promise.all([
    get_planets(),
    get_recipes()]).then( data => {
      const path = window.location.pathname;
      const pathUpdate = path.replace(/[/]/, "")
      const found = data[0].find(planet => planet.name === pathUpdate)
      if(found !== undefined) {
        const filtered = data[1].filter(recipe => recipe.id_planet === found.id)
        const planeter = renderPlanets(found, filtered);
        let root = document.getElementById('root')
        root.innerHTML = ``
        root.appendChild(planeter);
        logicHeader(data[0])
        logicPlanets(found)
      }

      if (path === "/") {
        initial()
      }

      if (path === '/home') {
        const homer = renderHome(data[0], data[1])
        let root = document.getElementById('root')
        root.innerHTML = ``
        root.appendChild(homer);
        logicHome()
        logicHeader(data[0])
      }
      
      if (path === '/login') {
        const login = renderLogin();
        let root = document.getElementById('root')
        root.innerHTML = ``
        root.appendChild(login);
        logicHeader(data[0])
        logicLogin()
      }

      if (path === '/option') {
        const adder = add_planet_recipe();
        let root = document.getElementById('root')
        root.innerHTML = ``
        root.appendChild(adder);
        logicHeader(data[0])
        logicOption()
      }

      if (path === '/addPlanet') {
        const addPlat = addPlanet();
        let root = document.getElementById('root')
        root.innerHTML = ``
        root.appendChild(addPlat);
        logicHeader(data[0])
        logicOption()
      }

      if (path === '/addRecipes') {
        const addRec = addRecipe();
        let root = document.getElementById('root')
        root.innerHTML = ``
        root.appendChild(addRec);
        logicHeader(data[0])
      }

  })
}