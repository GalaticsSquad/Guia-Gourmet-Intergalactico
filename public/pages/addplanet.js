// // @author {João}
// //@coauthor {Carolina}

import {insertHeader, logicHeader} from "./header.js";
import { get_planets, post_planets } from "../src/fetch/planet.js";
import { get_recipes } from "../src/fetch/recipes.js";

// const multer = require('multer');

export default async function renderAddPlanet() {
    const dataPlanet = await get_planets()
    const dataRecipe = await get_recipes()
    const addPlanet = addplanet (dataPlanet)
    const root = document.getElementById('root')
    root.innerHTML = ``
    root.appendChild(addPlanet);
    logic_addPlanet()
    uploadImages()
    logicHeader(dataPlanet, dataRecipe)
} 

function addplanet (data) {
    const container = document.createElement("div");
    const header = insertHeader();
    const gentable = registerplanet(data)
    container.className = "rootContainerAddPlanets"
    container.innerHTML = ` 
        <header>${header}</header>
        <form class="container-addplanet" method='POST' action='/img'>
            <div id="planet-name">
                <label class="name-label" for="nome do Planeta">Nome do Planeta:</label>
                <input type="text" class="input-name-planet" name="username" maxlength="25" required>
            </div>
            <div class="back-img">
                <label class="label-back-img" for="img do fundo">Imagem do Fundo:</label>
                <input type="file" class="input-addplanet" id="imagebackground" name="username" required>
            </div>
            <div class="back-img">
                <label class="label-back-img" for="img do icone">Imagem do icone:</label >
                <input type="file" class="input-addplanet" id="imageicon" name="username" required>
            </div>
            <div id="description">
                <label class="name-label" for="Descrição">Descrição do Planeta:</label>
                <textarea name="" id="planet_description" cols="100" rows="8"></textarea required maxlength="800">
            </div>
            <input type="submit" class="send-planet" value="Adicionar Planeta">
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
                <tbody id="tbody">${gentable}</tbody>
            </table>
        </section>
        </form>
        `
        
    return container
}

function logic_addPlanet(){
    const enviarPlanet = document.querySelector('.send-planet')
    // post_planets(_name, _icon, _background, _description)
    enviarPlanet.addEventListener('click', () => {
        // event.preventDefault();
        
        const name = document.querySelector('.input-name-planet').value
        const description = document.querySelector('#planet_description').value
        const img_back = document.querySelector('#imagebackground').files[0].name
        const img_icon = document.querySelector('#imageicon').files[0].name
        const background = `../img/backgroud/${img_back}`
        const icon = `../img/planet/${img_icon}`
        
        
        post_planets(name, icon, background, description)
        
    })
}

    function uploadImages() {
        const form = document.querySelector('.container-addplanet')
        

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.querySelector('.input-name-planet').value
            const imageBackground = document.querySelector('#imagebackground');
            const imageIcon = document.querySelector('#imageicon');
            const formData = new FormData();           
                formData.append('file', imageBackground.files[0], `background-${name}.png`);
                formData.append('file', imageIcon.files[0], `icon-${name}.png`);
            
            
            fetch('/img', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
            });
        };     
    


function registerplanet(dataPlanet) {
    let table_planet = "";
    dataPlanet.forEach((planet) => {
        table_planet += `<tr>
        <td>${planet.id}</td>
        <td>${planet.name}</td>
        <td>${planet.icon}</td>
        <td>${planet.background}</td>
        <td class="table_description">${planet.description}</td>
        <td><span="material-symbols-rounded">
        edit</span></td>
        <td><span="material-symbols-rounded">
        delete</span></td>
        </tr>`;
    });
    return table_planet;
}