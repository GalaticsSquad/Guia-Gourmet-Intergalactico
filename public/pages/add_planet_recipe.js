// @author {Eduardo}
// @CoAuthor {João,Henrique,Carolina}

import {insertHeader, logicHeader}  from "./header.js";
import {EventCustom} from "../eventCustom.js";
import { get_planets } from "../src/fetch/planet.js"; 

export default async function renderOption() {
    const dataPlanet = await get_planets()
    const option = add_planet_recipe ()
    const root = document.getElementById('root')
    root.innerHTML = ``
    root.appendChild(option);
    logicOption()
    logicHeader(dataPlanet, dataRecipe)
}


function add_planet_recipe () {

const headerFake = insertHeader();
const container = document.createElement("div");
container.className = "rootContaineradd";
/* const container_class = document.querySelector(".rootContaineradd") */
container.innerHTML = `
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

    buttonPlat.addEventListener("click", () => {
        const evento = EventCustom("/addPlanet");
        root.dispatchEvent(evento);
    });
    buttonRec.addEventListener("click", () => {
        const evento = EventCustom("/addRecipes");
        root.dispatchEvent(evento);
    });
}