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
  // Promise.all([
  //   get_planets(),
  //   get_recipes()]).then( data => {
      
      
  //     const urlReplaced = url.replace(/[/]/, "")

  //     const found = data[0].find(planet => planet.name === urlReplaced)

  //     if(found !== undefined) {
  //       const filtered = data[1].filter(recipe => recipe.id_planet === found.id)
  //       const planeter = renderPlanets(found, filtered);
  //       let root = document.getElementById('root')
  //       root.innerHTML = ``
  //       root.appendChild(planeter);
  //       logicHeader(data[0])
  //       logicPlanets(found)
  //     }

  //     if (url === "/") {
  //       initial()
  //     }

  //     if (url === '/home') {
  //       const homer = renderHome(data[0], data[1])
  //       let root = document.getElementById('root')
  //       root.innerHTML = ``
  //       root.appendChild(homer);
  //       logicHome()
  //       logicHeader(data[0])
  //     }
      
  //     if (url === '/login') {
  //       const login = renderLogin();
  //       let root = document.getElementById('root')
  //       root.innerHTML = ``
  //       root.appendChild(login);
  //       logicHeader(data[0])
  //       logicLogin()
  //     }

  //     if (url === '/option') {
  //       const adder = add_planet_recipe();
  //       let root = document.getElementById('root')
  //       root.innerHTML = ``
  //       root.appendChild(adder);
  //       logicHeader(data[0])
  //       logicOption()
  //     }

  //     if (url === '/addPlanet') {
  //       const addPlat = addPlanet();
  //       let root = document.getElementById('root')
  //       root.innerHTML = ``
  //       root.appendChild(addPlat);
  //       logicHeader(data[0])
  //       logicOption()
  //     }

  //     if (url === '/addRecipes') {
  //       const addRec = addRecipe();
  //       let root = document.getElementById('root')
  //       root.innerHTML = ``
  //       root.appendChild(addRec);
  //       logicHeader(data[0])
  //     }

  // })