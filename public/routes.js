import initial from "/pages/initial.js";
import { logicHeader } from "/pages/header.js";
import { renderHome, logicHome } from "/pages/home.js";
import renderPlanets from "/pages/planets.js";
import login from "/pages/login.js";
// import recipe from "/pages/recipe.js";

// import add from "/pages/add.js";
// import addPlanet from "/pages/addPlanet.js";
// import addRecipe from "/pages/addrecipe.js";

import { get_planets } from "./src/fetch/planet.js"
/* import carrosel from "./src/carrosel.js"; */
// import { get_recipes } from "./fetch/recipes.js"

export default function Route() { 

    const path = window.location.pathname;
    console.log("pathname:", path)
  
    switch (path) {
      case '/': 
        initial();
        break;
  
      case '/home':
        get_planets()
          .then(data => {
            const homer = renderHome(data);
            let root = document.getElementById('root')
            root.innerHTML = ``
            root.appendChild(homer);
            logicHome()
            logicHeader(data)
          });
        break;

      case '/planets':
        console.log
        get_planets()
          .then(data => {
            const planeter = renderPlanets(data);
            let root = document.getElementById('root')
            root.innerHTML = ``
            root.appendChild(planeter);
            logicHeader(data)
          });
        break;

      case '/login':
        console.log(login())
        let root = document.getElementById('root')
        root.innerHTML = ``
        root.appendChild(login());
        break;
  
      default:
        document.getElementById('root').appendChild(initial());
        break;
    }
}

