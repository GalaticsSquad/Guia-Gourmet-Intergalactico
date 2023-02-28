// import routes from "./routes.js";
import {insertHeader, logicHeader} from "./header.js";
import { get_planets_id, get_planets} from "../src/fetch/planet.js";
import { get_recipes_id_planet, get_recipes } from "../src/fetch/recipes.js";
import { EventCustom } from "../eventCustom.js";


export default async function renderPlanets(_idPlanet, _idRecipe){

  // const filtered = data[1].filter(recipe => recipe.id_planet === _idPlanet)
  const dataPlanet = await get_planets()
  const dataPlanet_id = await get_planets_id(_idPlanet)
  const dataRecipe = await get_recipes_id_planet(_idPlanet) // pega as receitas de um planeta
  const allDataRecipe = await get_recipes()
  const planeter = planets(dataPlanet_id.data[0], dataRecipe.data, _idRecipe);
  const root = document.querySelector('#root')
  root.innerHTML = ``
  root.appendChild(planeter);
  logicHeader(dataPlanet.data, allDataRecipe.data)
  logicPlanets(dataPlanet_id.data[0])
  console.log("_idRecipe " , _idRecipe)
  console.log("_idPlanet " , _idPlanet)
  console.log("dataPlanet_id " , dataPlanet_id.data[0])
  console.log("dataPlanet " , dataPlanet.data)
  console.log("dataRecipe " , dataRecipe.data)
}

function planets (dataPlanet, dataRecipe, _idRecipe) {
  const root = document.querySelector('#root')
  root.style.cursor = 'auto'
  const recipePrincipal = dataRecipe.find( recipe => recipe.id === _idRecipe  )

  const insertH = insertHeader()

  const main_container = document.createElement("div");
  // Main container, background:
  const container = document.createElement("div");
  container.setAttribute("class", "main-container");

  const header = document.createElement('header')
  container.appendChild(header);
  header.innerHTML = insertH

  main_container.appendChild(container);
  main_container.style.backgroundImage = `url('${dataPlanet.background}')`
  main_container.setAttribute("class", "backgroundPLanets");

  // Receita:
  const recipeContainer = document.createElement("div");
  const imgDiv = document.createElement("div");
  const recipeName = document.createElement("h3");
  const recipeImg = document.createElement("div");
  const textDiv = document.createElement("div");
  const ingredientSection = document.createElement("section");
  const ingredientUl = document.createElement("ul");
  const methodSection = document.createElement("section");
  const imgprato1 = document.createElement("img");
  const methodTitle = document.createElement("h3");
  const ingredientstitle = document.createElement("h3");

  const container_part2 = document.createElement("div");
  container_part2.setAttribute("class", "container_part2");
  container.appendChild(recipeContainer);

  imgDiv.appendChild(recipeName);
  recipeName.setAttribute("class", "recipe-name");
  recipeName.innerHTML = recipePrincipal.name;
  recipeImg.appendChild(imgprato1);
  imgprato1.setAttribute("class", "imagep1");
  imgprato1.src = `../${recipePrincipal.image}`;

  recipeContainer.appendChild(imgDiv);
  imgDiv.appendChild(recipeImg);
  recipeContainer.appendChild(textDiv);
  textDiv.appendChild(ingredientSection);
  ingredientSection.appendChild(ingredientstitle);
  ingredientSection.appendChild(ingredientUl);
  textDiv.appendChild(methodSection);
  methodSection.appendChild(methodTitle);

  ingredientstitle.textContent = "Ingredientes:";
  methodTitle.setAttribute("class", "method-title");
  methodTitle.textContent = "Modo De Preparo";
  const methodTexOlt = document.createElement("ol");
  methodSection.appendChild(methodTexOlt);
  recipePrincipal.instructions.forEach(instruction => {
    const methodText = document.createElement("li");
    methodTexOlt.appendChild(methodText);
    methodText.textContent = instruction;
  });

  recipeContainer.setAttribute("class", "recipe-container");
  imgDiv.setAttribute("class", "recipe-img-div");
  recipeImg.setAttribute("class", "recipe-img");
  textDiv.setAttribute("class", "recipe-text-div");
  ingredientSection.setAttribute("class", "recipe-ingredients-section");
  methodSection.setAttribute("class", "recipe-method-section");
  ingredientstitle.setAttribute("class", "ingredientstitle");

  // Adicionar list em UL baseado no número de ingredientes retornados pelo servidor:
  for (let i = 0; i < recipePrincipal.ingredients.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = recipePrincipal.ingredients[i];
    ingredientUl.appendChild(li);
  }

  // Info do planeta:
  const planetContainer = document.createElement("div");
  const textPlanetDiv = document.createElement("div");
  const imgPlanetDiv = document.createElement("div");
  const textPlanet = document.createElement("p");
  const planeta1 = document.createElement("div");
  textPlanet.textContent = dataPlanet.description;

  container.appendChild(planetContainer);
  planetContainer.appendChild(textPlanetDiv);
  planetContainer.appendChild(imgPlanetDiv);
  textPlanetDiv.appendChild(textPlanet);
  imgPlanetDiv.appendChild(planeta1);

  planetContainer.setAttribute("class", "planet-info-container");
  textPlanetDiv.setAttribute("class", "planet-text-div");
  textPlanet.setAttribute("class", "planet-text");
  imgPlanetDiv.setAttribute("class", "planet-image-div");
  imgPlanetDiv.style.backgroundImage = `url(../${dataPlanet.icon})`


  // Mais receitas:
  const recipeListContainer = document.createElement("div");
  container.appendChild(recipeListContainer);

  dataRecipe.forEach(plate => {
    const templateRecipeDiv = document.createElement("div");
    const templateRecipeImgDiv = document.createElement("img");
    const templateRecipeTextSection = document.createElement("section");
    const templateRecipeTitle= document.createElement("h2");
    const templateRecipeText = document.createElement("p");
    const templateRecipeTime = document.createElement("p");
    const button_container_text = document.createElement("div");
    const button_text = document.createElement("a");
    button_text.innerHTML = `Veja Mais`;

    recipeListContainer.appendChild(templateRecipeDiv);
    templateRecipeDiv.appendChild(templateRecipeImgDiv);
    templateRecipeDiv.appendChild(templateRecipeTextSection);
    templateRecipeTextSection.appendChild(templateRecipeTitle);
    templateRecipeTextSection.appendChild(templateRecipeText);
    templateRecipeTextSection.appendChild(templateRecipeTime);
    templateRecipeDiv.appendChild(button_container_text);
    button_container_text.appendChild(button_text);

    recipeListContainer.setAttribute("class", "recipe-list-container");
    templateRecipeDiv.setAttribute("class", "template-recipe-div");
    templateRecipeImgDiv.setAttribute("class", "template-image-div");
    templateRecipeImgDiv.setAttribute("src", `../${plate.image}`);
    templateRecipeTextSection.setAttribute("class", "template-text-section");
    templateRecipeTitle.setAttribute("class", "template-recipe-title");
    templateRecipeTitle.innerText = plate.name;
    templateRecipeText.setAttribute("class", "template-recipe-text");
    templateRecipeText.innerText = plate.description;
    templateRecipeTime.setAttribute("class", "template-recipe-time");
    templateRecipeTime.innerText = `Tempo de preparo: ${plate.time};`
    button_container_text.setAttribute("class", "button_container_text");
    button_text.setAttribute("class", "button_text");
    button_text.setAttribute("href", "#root");

    button_text.addEventListener('click', () => {
      const evento = EventCustom(`/planets`, plate.id_planet, plate.id) ;
      root.dispatchEvent(evento);
      button_text.disabled = true
      button_text.style.cursor = 'wait'
      root.style.cursor = 'wait'
    })

  });

  const footer = document.createElement("footer");
  main_container.appendChild(footer)
  footer.setAttribute("class", "planetsFooter");
  const tagAFooter = document.createElement('a')
  footer.appendChild(tagAFooter)
  tagAFooter.setAttribute("href", "https://github.com/GalaticsSquad/Guia-Gourmet-Intergalactico");
  tagAFooter.setAttribute("class", "textFooter");
  tagAFooter.innerText = "Copyright 2023 GalaticSquad - Carolina Liberato, Henrique Saiti, Eduardo Henrique, João Vitor"

  return main_container;
}

function logicPlanets (data) {
  const titlePlanet = document.querySelector('.titlePlanet')
  titlePlanet.innerText = data.name
}