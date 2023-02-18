import initial from "/pages/initial.js";
import { logicHeader } from "/pages/header.js";
import { renderHome, logicHome } from "/pages/home.js";
import renderPlanets from "/pages/planets.js";
import renderLogin from "/pages/login.js";
// import recipe from "/pages/recipe.js";

// import add from "/pages/add.js";
// import addPlanet from "/pages/addPlanet.js";
// import addRecipe from "/pages/addrecipe.js";

import { get_planets } from "./src/fetch/planet.js"
/* import carrosel from "./src/carrosel.js"; */
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
        const login = renderLogin(data);
            let root = document.getElementById('root')
            root.innerHTML = ``
            root.appendChild(login);
            logicHeader(data[0])
      }

  })
}