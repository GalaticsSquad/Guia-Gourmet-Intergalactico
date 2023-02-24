// // @author {Eduardo}
// //@coauthor {Carolina,João}

import {insertHeader, logicHeader} from "./header.js";
import { get_planets } from "../src/fetch/planet.js";
import { get_recipes, post_recipes } from "../src/fetch/recipes.js";

export default async function renderAddRecipe() {
    const dataPlanet = await get_planets()
    const dataRecipe = await get_recipes()
    
    const addRecipe = addRecipeHTML(dataRecipe, dataPlanet)
    const root = document.getElementById('root')
    root.innerHTML = ``
    root.appendChild(addRecipe);
    logic_recipe()
    upload_receitaImg()
    logicHeader(dataPlanet, dataRecipe)
}

function addRecipeHTML(dataRecipe, dataPlanet) {
    const header = insertHeader();
    const container = document.createElement("div");
    const add_OP_planets = add_options_planet(dataPlanet)
    const gentable = registerrecipe(dataRecipe);
    container.className = "rootContainerAddRecipes"
    container.innerHTML = `
    <header>${header}</header>
    <div class="container_planet_recipe">
        <form class="form_envio" method='POST' action='/img2'>
            <div class="div_input">
                <label>Nome do Planeta</label>
                <div>
                    <select id="planet_select">
                        <option value="0">planets</option>
                        ${add_OP_planets}
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
                    <select id="type_select">
                        <option value="0">types</option>
                        <option value="Salada">Salada</option>
                        <option value="Sobremesa">Sobremesa</option>
                        <option value="Prato Principal">Prato Principal</option>
                        <option value="Entrada">Entrada</option>
                    </select>
                </div>
            </div>
            <div class="div_input">
                <label>Nome da receita:</label>
                <div class="div_input">
                    <input type="text" id="input_name" maxlength="32">
                </div>
            </div>
            <div class="div_input">
                <label>Descrição do Prato:</label>
                <div class="div_input">
                <textarea id="food_description" cols="95" rows="5" maxlength="750">
                </textarea>
                </div>
            </div>
            <div class="div_input">
                <label>Tempo de preparo:</label>
                <div class="div_input">
                    <input type="text" id="input_tempo" maxlength="11">
                </div>
            </div>
            <div class="div_input">
                <label>Ingredientes:</label>
                <div class="div_input">
                    <input type="text" class="input_ingredients" maxlength="100">
                </div>
                <button class="addIngredient">Adicionar ingrediente</button>
            <div class="div_input">
                <label>Preparo:</label>
                <div class="div_input">
                    <input type="text" class="input_description" maxlength="100">
                </div>
                <button class="addDescription">Adicionar ingrediente</button>
            </div>
                <input type="submit" class="envio_button" value="Enviar">
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
                        ${gentable}
                    </tbody>
                </table>
            </section>
        </form>
    </div>
    `;

    return container
}

function registerrecipe(data) {
    let table_recipe = "";
    data.forEach((recipe) => {
    let ingredients_recipes = "";
    recipe.ingredient.forEach((Ing) => ingredients_recipes += `${Ing}`);

    let preparation_recipes = "";
    recipe.instructions.forEach((prep) => preparation_recipes += `${prep}`);

    table_recipe += `<tr>
    <td>${recipe.id}</td>
    <td>${recipe.id_planet}</td>
    <td>${recipe.name}</td>
    <td>${recipe.image}</td>
    <td>${recipe.time}</td>
    <td>${ingredients_recipes}</td>
    <td>${preparation_recipes}</td>
    <td>${recipe.type}</td>
    <td>${recipe.description}</td>
    <td><img/ src="../img/lapis.png"></td>
    <td><img/ src="../img/excluir.png"></td>
    </tr>`;
});
return table_recipe;
}

function add_options_planet(dataPlanet){
    let options = ``
    for(let i=0; i<dataPlanet.length;i++){
        options = options+`<option value=${dataPlanet[i].id}>${dataPlanet[i].name}</option>`
    }
    return options;
}

function logic_recipe(){
    let ingredients = []
    let instructions = []
    const button_Ingredient = document.querySelector('.addIngredient')
    const button_Description = document.querySelector('.addDescription')
    const name_recipe = document.querySelector('#input_name')
    const input_tempo = document.querySelector('#input_tempo')
    const input_ingredients = document.querySelector('.input_ingredients')
    const input_description = document.querySelector('.input_description')

    input_tempo.addEventListener('input', (event)=>{
        event.preventDefault();
        input_tempo.value = input_tempo.value.replace(/[\031-\037]/g, "")
        input_tempo.value = input_tempo.value.replace(/[\041-\055]/g, "")
        input_tempo.value = input_tempo.value.replace(/[\072-\100]/g, "")
        input_tempo.value = input_tempo.value.replace(/[\133-\140]/g, "")
        input_tempo.value = input_tempo.value.replace(/[\173-\277]/g, "")
    })

    name_recipe.addEventListener('input', (event)=>{
        event.preventDefault();
        name_recipe.value = name_recipe.value.replace(/[\031-\037]/g, "")
        name_recipe.value = name_recipe.value.replace(/[\041-\055]/g, "")
        name_recipe.value = name_recipe.value.replace(/[\072-\100]/g, "")
        name_recipe.value = name_recipe.value.replace(/[\133-\140]/g, "")
        name_recipe.value = name_recipe.value.replace(/[\173-\277]/g, "")
    })

    input_ingredients.addEventListener('input', (event)=>{
        event.preventDefault();
        input_ingredients.value = input_ingredients.value.replace(/[\031-\037]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\041-\055]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\072-\100]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\133-\140]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\173-\277]/g, "")
    })
    
    input_description.addEventListener('input', (event)=>{
        event.preventDefault();
        input_ingredients.value = input_ingredients.value.replace(/[\031-\037]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\041-\055]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\072-\100]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\133-\140]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\173-\277]/g, "")
    })

    button_Ingredient.addEventListener('click', (event)=>{
        event.preventDefault();
        ingredients.push(input_ingredients.value)
        input_ingredients.value = ``
        console.log(ingredients)
    })
    
    button_Description.addEventListener('click', (event)=>{
        event.preventDefault();
        
        instructions.push(input_description.value)
        input_description.value = ``
        console.log(instructions)
    })
    
    const button = document.querySelector('.envio_button')
    button.addEventListener('click', ()=>{
        // event.preventDefault();
        const id_planet = document.querySelector('#planet_select').value
        const name = document.querySelector('#input_name').value
        const description = document.querySelector('#food_description').value
        const type = document.querySelector('#type_select').value
        const time = document.querySelector('#input_tempo').value
        const nameRG = name.replace(/ /g, "")
        const image = `../img/recipe/receita-${nameRG}.png`
       
        

        post_recipes(id_planet, name, description, type, image, time, ingredients, instructions)
        console.log({id_planet: id_planet,name: name, descrip: description,type: type,image: image,time: time,ingredi: ingredients,inst: instructions})

        /* post_recipes() */
        // console.log('teste!!! ',planet_select.value, type_select.value, input_name, input_tempo, description.value, instructions, instructions)
    })
}

function upload_receitaImg() {
    const form = document.querySelector('.form_envio')      

        // Upload da imagem receita
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.querySelector('#input_name').value;
        const imageRecipe = document.querySelector('#input_image_receita')

        const formData = new FormData();    

        const nameRG = name.replace(/ /g, "")    
            formData.append('file', imageRecipe.files[0], `receita-${nameRG}.png`);

        fetch('/img2', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        });
}