// // @author {João}
// //@coauthor {Carolina}

import {insertHeader, logicHeader} from "./header.js";
import { get_planets } from "../src/fetch/planet.js";
import { get_recipes } from "../src/fetch/recipes.js";

export default async function renderAddPlanet() {
    const dataPlanet = await get_planets()
    const dataRecipe = await get_recipes()
    const addPlanet = addplanet ()
    // const gentable = registerplanet(dataPlanet);
    const root = document.getElementById('root')
    root.innerHTML = ``
    root.appendChild(addPlanet);
    logicHeader(dataPlanet, dataRecipe)
} 

function addplanet () {
    const container = document.createElement("div");
    const header = insertHeader();
    container.className = "rootContainerAddPlanets"
    container.innerHTML = ` 
        <header>${header}</header>
        <form class="container-addplanet">
            <div id="planet-name">
                <label class="name-label" for="nome do Planeta">Nome do Planeta:</label>
                <input type="text" class="input-name-planet" name="username" maxlength="25">
            </div>
            <div class="back-img">
                <label class="label-back-img" for="img do fundo">Imagem do Fundo:</label>
                <input type="file" class="input-addplanet" id="imagebackground" name="username">
            </div>
            <div class="back-img">
                <label class="label-back-img" for="img do icone">Imagem do icone:</label>
                <input type="file" class="input-addplanet" id="imageicon" name="username">
            </div>
            <div id="description">
                <label class="name-label" for="Descrição">Descrição do Planeta:</label>
                <textarea name="" id="planet_description" cols="100" rows="10"></textarea>
            </div>
            <input type="button" class="send-planet" value="Enviar Planeta">
            <section id="section-lista">
            <table id="table">
                <thead>
                    <tr id="table-heading">
                        <th class="id-number">#ID</th>
                        <th class="nome">NOME</th>
                        <th class="e-mail">icone</th>
                        <th class="editar">Background</th>
                        <th class="excluir">Descrição</th>
                        <th class="editar">Editar</th>
                        <th class="excluir">Excluir</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                </tbody>
            </table>
        </section>
        </form>
        `
        
    return container
}
// function registerplanet(dataPlanet) {
//     let table_planet = "";
//     data.forEach((planet) => {
//       table_planet += `<tr>
//       <td>${planet.id}</td>
//       <td>${planet.name}</td>
//       <td>${planet.icon}</td>
//       <td>${planet.background}</td>
//       <td>${planet.description}</td>
//       <td><img/ src="../img/lapis.png"></td>
//       <td><img/ src="../img/excluir.png"></td>
//       </tr>`;
//     });
//     return table_planet;
//   }