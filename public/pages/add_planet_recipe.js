// @author {Eduardo}
// @CoAuthor {João,Henrique,Carolina}

import {insertHeader, logicHeader}  from "./header.js";
import {EventCustom} from "../eventCustom.js";
import { get_planets } from "../src/fetch/planet.js"; 
import { get_recipes } from "../src/fetch/recipes.js";

export default async function renderOption() {
    const dataPlanet = await get_planets()
    const dataRecipe = await get_recipes()
    const option = add_planet_recipe ()
    const root = document.getElementById('root')
    root.innerHTML = ``
    root.appendChild(option);
    logicOption()
    logicHeader(dataPlanet.data, dataRecipe.data)
}


function add_planet_recipe () {

const headerFake = insertHeader();
const container = document.createElement("div");
container.className = "rootContaineradd";
container.innerHTML = `
    <div class="backgroundInit"></div>
    <header>${headerFake}</header>
    <div class="cadastro_planet_recipe">
        <div class="buttons_planet_recipe">

            <input type="button" class="button_p_r" id="buttonP" value="Adicionar Planeta">

            <input type="button" class="button_p_r" id="buttonR" value="Adicionar Receita">

        </div>
    </div>
    `;
    return container
}

function logicOption () {
    const buttonPlat = document.querySelector("#buttonP");
    const buttonRec = document.querySelector("#buttonR");
    const root = document.querySelector('#root')
    root.style.cursor = 'auto';

    buttonPlat.addEventListener("click", () => {
        root.style.cursor = 'wait';
        const evento = EventCustom("/addPlanet");
        root.dispatchEvent(evento);
    });
    buttonRec.addEventListener("click", () => {
        root.style.cursor = 'wait';
        const evento = EventCustom("/addRecipes");
        root.dispatchEvent(evento);
    });
}