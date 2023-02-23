// // @author {Eduardo}
// //@coauthor {Carolina,João}

import {insertHeader, logicHeader} from "./header.js";
import { get_planets } from "../src/fetch/planet.js";
import { get_recipes } from "../src/fetch/recipes.js";

export default async function renderAddRecipe() {
    const dataPlanet = await get_planets()
    const dataRecipe = await get_recipes()
    console.log(dataRecipe)
    // const gentable = registerrecipe(dataRecipe);
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
                    <select id="planet_select">
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
                    <select id="Type_select">
                        <option>type 1</option>
                        <option>type 2</option>
                        <option>type 3</option>
                        <option>type 4</option>
                    </select>
                </div>
            </div>
            <div class="div_input">
                <label>Descrição do Prato:</label>
                <div class="div_input">
                <textarea id="food_description" cols="95" rows="5">
                </textarea>
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
                    <textarea id="text_ingredients" cols="95" rows="5">
                    </textarea>
                </div>
            <div class="div_input">
                <label>Preparo:</label>
                <div class="div_input">
                    <textarea id="text_preparation" cols="95" rows="5">
                    </textarea>
                </div>
            </div>
                <input type="button" class="envio_button" id="input_send_recipe value="Enviar">
            </div>
            <section id="section-lista">
            <table id="table">
            <thead>
                <tr id="table-heading">
                    <th class="id-number">#ID</th>
                    <th class="nome">id planeta</th>
                    <th class="e-mail">Nome</th>
                    <th class="editar">imagem</th>
                    <th class="excluir">Tempo</th>
                    <th class="excluir">ingredientes</th>
                    <th class="excluir">preparo</th>
                    <th class="excluir">tipo</th>
                    <th class="excluir">descrição</th>
                    <th class="editar">Editar</th>
                    <th class="excluir">Excluir</th>
                </tr>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>
    </section>body">
                </tbody>
            </table>
        </section>
        </form>
    </div>
    `;

    return container
}
// function registerrecipe(dataRecipe) {
//     let table_recipe = "";
//     data.forEach((recipe) => {
//       let ingredients_recipes = "";
//       recipe.ingredients.forEach((Ing) => ingredients_recipes += `${Ing}`);
  
//       let preparation_recipes = "";
//       recipe.instructions.forEach((prep) => preparation_recipes += `${prep}`);
  
//       table_recipe += `<tr>
//         <td>${recipe.id}</td>
//         <td>${recipe.id_planet}</td>
//         <td>${recipe.name}</td>
//         <td>${recipe.image}</td>
//         <td>${recipe.time}</td>
//         <td>${ingredients_recipes}</td>
//         <td>${preparation_recipes}</td>
//         <td>${recipe.type}</td>
//         <td>${recipe.description}</td>
//         <td><img/ src="../img/lapis.png"></td>
//         <td><img/ src="../img/excluir.png"></td>
//         </tr>`;
//     });
//     return table_recipe;
//   }