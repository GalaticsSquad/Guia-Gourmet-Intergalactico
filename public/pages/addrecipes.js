// // @author {Eduardo}
// //@coauthor {Carolina,João}

import {insertHeader, logicHeader} from "./header.js";
import { get_planets } from "../src/fetch/planet.js";

export default async function renderAddRecipe() {
    const dataPlanet = await get_planets()
    const addRecipe = addRecipeHTML()
    const root = document.getElementById('root')
    root.innerHTML = ``
    root.appendChild(addRecipe);
    logicHeader(dataPlanet, dataRecipe)
}

function addRecipeHTML() {
    const header = insertHeader();
    const container = document.createElement("div");
    container.className = "rootContainerAddRecipes"
    container.innerHTML = `
    <header>${header}</header>
    <div class="container_planet_recipe">
        <form class="form_envio">
            <div class="div_input">
                <label>Nome do Planeta</label>
                <div>
                    <select>
                        <option>planet 1</option>
                        <option>planet 2</option>
                        <option>planet 3</option>
                        <option>planet 4</option>
                    </select>
                </div>
            </div>
            <div class="div_input">
                <label>Imagem da receita:</label>
                <div class="div_image">
                    <input type="file" id="input_image_receita">
                </div>
            </div>
            <div class="div_input">
                <label>Tipo da Receita:</label>
                <div>
                    <select>
                        <option>type 1</option>
                        <option>type 2</option>
                        <option>type 3</option>
                        <option>type 4</option>
                    </select>
                </div>
            </div>
            <div class="div_input">
                <label>Tempo de preparo:</label>
                <div class="div_input">
                    <input type="text" id="input_tempo">
                </div>
            </div>
            <div class="div_input">
                <label>Ingredientes:</label>
                <div class="div_input">
                    <textarea id="text_receita" cols="95" rows="5">
                    </textarea>
                </div>
            <div class="div_input">
                <label>Preparo:</label>
                <div class="div_input">
                    <textarea id="text_receita" cols="95" rows="5">
                    </textarea>
                </div>
            </div>
                <input type="button" class="envio_button" id="input_image_planeta" value="Enviar">
            </div>

        </form>
    </div>
    `;

    return container
}
// function registerrecipe(){
//         registerBtn.disabled = true;
        
//         if (nameInput.value == "" || emailInput.value == ""){
//             message.innerText = `Falha no cadastro do usuário!\n Você precisa preencher o nome e a descrição do usuário!`;
//             setTimeout(clearMsgs, 1500);
//         }
//         let recipe = {
//               id: 0,
//               id_planet: 0,
//               name: "Prato Cibernético com Nanofungos",
//               description: "Um prato eletrizante com fungos deliciosos com planstas refrescantes, adicionado de um molho de ervas.",
//               type: "Prato principal",
//               time: "10 min",
//               ingredients: [
//                 "200g de nanofungos",
//                 "1 colher de sopa de bit-sal",
//                 "50g de aglomerato de chips",
//                 "10 glóbulos de carga"],
//               instructions: [
//                 "Em uma panela, coloque água e deixe ferver. Adicione os nanofungos e cozinhe por 3 minutos. Escorra e reserve.",
//                 "Em um prato de apresentação, espalhe o aglomerato de chips e adicione os nanofungos por cima.",
//                 "Polvilhe o bit-sal sobre a mistura de chips e fungos.",
//                 "Coloque os glóbulos de carga sobre o prato, e sirva imediatamente para que os glóbulos liberem sua carga elétrica, dando um toque de energia ao prato."],
//               image: "/img/recipe/p.png",
//               delete: false,
//               visit_count: 0
//             }
//         }
