import initial from "/pages/initial.js";
import planets from "/pages/planets.js";
// import home from "/pages/home.js";
// import recipe from "/pages/recipe.js";
import login from "/pages/login.js";
// import add from "/pages/add.js";
// import addPlanet from "/pages/addPlanet.js";
// import addRecipe from "/pages/addrecipe.js";

export default function Route(){
  const rota = {
    '/': initial(),
    '/planets': planets(),
    // home: home(),
    // recipe: recipe(),
    // '/login': login(),
    // add: add(),
    // addPlanet: addPlanet(),
    // addRecipe: addRecipe(),
    getPages: function(url){
      console.log(this[url])
      return this[url]
    }
  }
return rota;
};

// import Home from "./home.js"
// import Doces from "./doces.js"
// import Brigadeiros from "./brigadeiros.js"
// import Cupcakes from "./cupcakes.js"

// export default function  Route(){
//     const rota = {
//         '/': Home(),
//         '/brigadeiros': Brigadeiros(),
//         '/cupcakes': Cupcakes(),
//         '/doces': Doces(),
    
//         getPages: function(url){
//             return this[url]
//         }
//     }
//     return rota;
// }