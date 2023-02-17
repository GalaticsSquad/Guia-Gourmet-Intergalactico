import initial from "/pages/initial.js";
import planets from "/pages/planets.js";
import home from "/pages/home.js";
// import recipe from "/pages/recipe.js";
// import login from "/pages/login.js";
// import add from "/pages/add.js";
// import addPlanet from "/pages/addPlanet.js";
// import addRecipe from "/pages/addrecipe.js";

export default function Route() {
  const rota = {
    "/": initial(),
    "/planets": planets(),
    "/home": home(),
    // "/recipe": recipe(),
    // '/login': login(),
    // add: add(),
    // addPlanet: addPlanet(),
    // addRecipe: addRecipe(),
    getPages: function (url) {
      return this[url];
    },
  };
  return rota;
}
