// @author {Eduardo}
// @CoAuthor {João,Henrique}

import insertHeader from "./header.js";

export default function add_planet_recipe (data) {

const headerFake = insertHeader();
const container_class = document.querySelector(".rootContaineradd");
const container = document.createElement("div");
container.className = "rootContaineradd";
container_class.innerHTML = `
    <div class="container_planet_recipe">
        <div class="cadastro_planet_recipe">
            <div class="buttons_planet_recipe">

                <input type="button" class="button_p_r" id="buttonP" value="Adicionar Planeta">

                <input type="button" class="button_p_r" id="buttonR" value="Adicionar Receita">

            </div>
        </div>
    </div>
    `;
}
