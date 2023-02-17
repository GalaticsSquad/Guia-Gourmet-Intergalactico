// import routes from "./routes.js";
/* import insertHeader from './header.js' */

// export default () => {
// root:
export default function () {
const root = document.querySelector("#root");

const main_container = document.createElement("div");
// Main container, background:
const container = document.createElement("div");

container.setAttribute("class", "main-container");
const background = document.createElement("div");

const header = document.createElement('header')
container.appendChild(header);

main_container.appendChild(container);
main_container.appendChild(background);

background.setAttribute("class", "planet-background");

// Receita:
const recipeContainer = document.createElement("div");
const imgDiv = document.createElement("div");
const recipeName = document.createElement("h3");
const recipeImg = document.createElement("div");
const textDiv = document.createElement("div");
const ingredientSection = document.createElement("section");
const ingredientUl = document.createElement("ol");
const methodSection = document.createElement("section");
const methodText = document.createElement("p");
const imgprato1 = document.createElement("img");
const methodTitle = document.createElement("h3");
const ingredientstitle = document.createElement("h3");

const container_part2 = document.createElement("div");
container_part2.setAttribute("class", "container_part2");

container.appendChild(recipeContainer);

imgDiv.appendChild(recipeName);
recipeName.innerHTML = "Mixtrous a lá Borroca";
recipeImg.appendChild(imgprato1);
imgprato1.setAttribute("class", "imagep1");
// imgprato1.src = "images/prat1.png";

recipeContainer.appendChild(imgDiv);
imgDiv.appendChild(recipeImg);
recipeContainer.appendChild(textDiv);
textDiv.appendChild(ingredientSection);
ingredientSection.appendChild(ingredientstitle);
ingredientSection.appendChild(ingredientUl);
textDiv.appendChild(methodSection);
methodSection.appendChild(methodTitle);
methodSection.appendChild(methodText);

ingredientstitle.textContent = "Ingredientes:";
methodTitle.textContent = "Modo De Preparo";
methodText.textContent = 
`1- Bata todos os ingredientes no liquidificador por 2 minutos.\n\n
  2-Em seguida desligue e, com uma colher, misture a farinha que grudou no copo do liquidificador.
  Bata novamente só para misturar e reserve. 
  Unte a frigideira com um fio de óleo e leve ao fogo até aquecer. 
  Com o auxílio de uma concha, pegue uma porção de massa e coloque na frigideira, gire a frigideira para espalhar bem a massa.`;

recipeContainer.setAttribute("class", "recipe-container");
imgDiv.setAttribute("class", "recipe-img-div");
recipeImg.setAttribute("class", "recipe-img");
textDiv.setAttribute("class", "recipe-text-div");
ingredientSection.setAttribute("class", "recipe-ingredients-section");
methodSection.setAttribute("class", "recipe-method-section");
ingredientstitle.setAttribute("class", "ingredientstitle");

// Adicionar list em UL baseado no número de ingredientes retornados pelo servidor:
for (let i = 0; i < 5; i++) {
  var li = document.createElement("li");
  li.innerHTML = ` ingrediente`;
  ingredientUl.appendChild(li);
}

// Info do planeta:
const planetContainer = document.createElement("div");
const textPlanetDiv = document.createElement("div");
const imgPlanetDiv = document.createElement("div");
const textPlanet = document.createElement("p");
const planeta1 = document.createElement("div");
/* planeta1.src = ""; */
textPlanet.textContent =
  "Um planeta (do grego πλανήτης [planεːtεːs] viajante) é um corpo celeste que orbita uma estrela ou um remanescente de estrela, com massa suficiente para se tornar esférico pela sua própria gravidade, mas não ao ponto de causar fusão termonuclear, e que tenha limpado de planetesimais a sua região vizinha (dominância orbital).[1][2] O termo planeta é antigo, com ligações com a história, astrologia, ciência, mitologia e religião. Os planetas eram vistos por muitas culturas antigas como divinos ou emissários de deuses. À medida que o conhecimento científico evoluiu, a percepção humana sobre os planetas mudou, incorporando diversos tipos de objetos. Em 2006, a União Astronômica Internacional (UAI) adotou oficialmente uma resolução definindo planetas dentro do Sistema Solar, a qual tem sido elogiada e criticada, permanecendo em discussão entre alguns cientistas.";

container.appendChild(planetContainer);
planetContainer.appendChild(textPlanetDiv);
planetContainer.appendChild(imgPlanetDiv);
textPlanetDiv.appendChild(textPlanet);
imgPlanetDiv.appendChild(planeta1);

planetContainer.setAttribute("class", "planet-info-container");
textPlanet.setAttribute("class", "planet-text-div");
imgPlanetDiv.setAttribute("class", "planet-image-div");
planeta1.setAttribute("class", "imgplaneta1");

// Mais receitas:
const recipeListContainer = document.createElement("div");

const templateRecipeDiv = document.createElement("div");
const templateRecipeImgDiv = document.createElement("div");
const templateRecipeTextSection = document.createElement("section");
const templateRecipeText = document.createElement("p");

container.appendChild(recipeListContainer);
recipeListContainer.appendChild(templateRecipeDiv);
templateRecipeDiv.appendChild(templateRecipeImgDiv);
templateRecipeDiv.appendChild(templateRecipeTextSection);
templateRecipeTextSection.appendChild(templateRecipeText);

recipeListContainer.setAttribute("class", "recipe-list-container");
templateRecipeDiv.setAttribute("class", "template-recipe-div");
templateRecipeImgDiv.setAttribute("class", "template-image-div");
templateRecipeTextSection.setAttribute("class", "template-text-section");
templateRecipeText.setAttribute("class", "template-recipe-text");

return main_container;

}


// };

// let i_civil = 0;

// td_buttonleft.addEventListener('click', function(){
//     if(i_civil > 0){
//         i_civil--;
//     }
//     console.log(i_civil);
//     console.log(example.civilizations[i_civil]);
//     td_civilName1.textContent = example.civilizations[i_civil];
//     td_civilName2.textContent = example.civilizations[(i_civil+1)];
//     td_civilName3.textContent = example.civilizations[(i_civil+2)];
//     civilLogo1.src = example.logos[0];
//     civilLogo2.src = example.logos[1];
//     civilLogo3.src = example.logos[2];
// });

// td_buttonright.addEventListener('click', function(){
//     if(i_civil < 1){
//         i_civil++;
//     }
//     console.log(i_civil);
//     console.log(example.logos[i_civil]);
//     td_civilName1.textContent = example.civilizations[i_civil];
//     td_civilName2.textContent = example.civilizations[(i_civil+1)];
//     td_civilName3.textContent = example.civilizations[(i_civil+2)];
//     civilLogo1.src = example.logos[i_civil];
//     civilLogo2.src = example.logos[(i_civil+1)];
//     civilLogo3.src = example.logos[(i_civil+2)];
// });

// civilLogo1.src = example.logos[0];
// civilLogo2.src = example.logos[1];
// civilLogo3.src = example.logos[2];

// td_civilName1.textContent = example.civilizations[i_civil];
// td_civilName2.textContent = example.civilizations[(i_civil+1)];
// td_civilName3.textContent = example.civilizations[(i_civil+2)];
