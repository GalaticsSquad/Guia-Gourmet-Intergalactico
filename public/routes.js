import initial from "/pages/initial.js";
// import planets from "/pages/planets.js";
import home from "/pages/home.js";
// import recipe from "/pages/recipe.js";
// import login from "/pages/login.js";
// import add from "/pages/add.js";
// import addPlanet from "/pages/addPlanet.js";
// import addRecipe from "/pages/addrecipe.js";

import { get_planets } from "./src/fetch/planet.js"
import carrosel from "./src/carrosel.js";
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
            const homer = home(data);
            let root = document.getElementById('root')
            root.innerHTML = ``
            root.appendChild(homer);
            carrosel()
          });
        break;
  
      default:
        document.getElementById('root').appendChild(initial());
        break;
    }
}

