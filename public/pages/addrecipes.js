// // @author {Eduardo}
// //@coauthor {Carolina,João}

import {insertHeader, logicHeader} from "./header.js";
import { get_planets } from "../src/fetch/planet.js";
import { get_recipes, post_recipes, patch_recipes, delete_recipes } from "../src/fetch/recipes.js";

export default async function renderAddRecipe() {
    const dataPlanet = await get_planets()
    const dataRecipe = await get_recipes()
    const addRecipe = addRecipeHTML(dataRecipe.data, dataPlanet.data)
    const root = document.getElementById('root')
    root.innerHTML = ``
    root.appendChild(addRecipe);
    logic_recipe(dataRecipe)
    upload_receitaImg()
    logicHeader(dataPlanet.data, dataRecipe.data)
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
                <label class ="labelRecipe">Selecione o planeta que deseja adicionar a receita:</label>
                <select id="planet_select">
                        <option value="0">Selecione o planeta:</option>
                        ${add_OP_planets}
                </select>
            </div>
            <div class="inputImgTypeContainer">
                <div class="inputImgContainer">
                    <label>Imagem da receita:</label>
                    <div class="div_image">
                        <input type="file" id="input_image_receita">
                    </div>
                </div>
                <div class="inputTypeContainer">
                    <label>Tipo da Receita:</label>
                    <select id="type_select">
                    <option value="0">Selecione o tipo:</option>
                    <option value="Salada">Salada</option>
                    <option value="Sobremesa">Sobremesa</option>
                    <option value="Prato Principal">Prato Principal</option>
                    <option value="Entrada">Entrada</option>
                    </select>
            </div>
            </div>
            
            <div class="nameTypeContainer">
                <div class="nameContainer">
                    <label>Nome da receita:</label>
                    <div class="div_input">
                        <input type="text" class="inputText" id="input_name" maxlength="32">
                    </div>
                </div>
                <div class="typeContainer">
                    <label>Tempo de preparo:</label>
                    <div class="div_input">
                        <input type="text"  class="inputText" id="input_tempo" maxlength="11">
                    </div>
                </div>
            </div>

            <div class="div_input">
                <label>Descrição do Prato:</label>
                <div class="div_input">
                    <input type="text"  class="food_description"" maxlength="50">
                </textarea>
                </div>
            </div>
            
            <div class="ingDesContainer">
                <div class="ingContainer">
                    <label>Adicione um ingrediente por vez:</label>
                    <div class="div_input">
                        <input type="text" class="input_ingredients" maxlength="100">
                    </div>
                    <div class="showListIngContainer">
                        <ul class="showListIng">
                        </ul>
                    </div>
                    <button class="addIngredient">Adicionar ingrediente</button>
                    <button class="exlAllIngredient">Excluir todos ingrediente</button>
                </div>
                <div class="desContainer">
                    <label>Adicione as instruções do preparo em ordem:</label>
                    <div class="div_input">
                        <input type="text" class="input_instructions" maxlength="100">
                    </div>
                    <div class="showListDesContainer">
                        <ul class="showListDes">
                        </ul>
                    </div>
                    <button class="addDescription">Adicionar instrução</button>
                    <button class="exlAllDescriptions">Excluir todos as instruções</button>
                </div>
            </div>
            <div class="buttonErrorContainer">
                <p class="textError">Deu algum erro!</p>
                <input type="submit" class="envio_button" value="Adicionar receita">
            </div>
            <section id="section-lista">
                <table id="table" class="tableAddRecipes">
                    <thead>
                        <tr id="table-heading">
                            <th class="id-number">#ID</th>
                            <th class="nome">ID planeta</th>
                            <th class="e-mail">Nome</th>
                            <th class="editar">Imagem</th>
                            <th class="excluir">Tempo</th>
                            <th class="excluir">Ingredientes</th>
                            <th class="excluir">Preparo</th>
                            <th class="excluir">Tipo</th>
                            <th class="excluir">Descrição</th>
                            <th class="editar">Editar</th>
                            <th class="excluir">Excluir</th>
                        </tr>
                    </thead>
                    <tbody id="tbody" class="tbodyAddRecipes">
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
    <td><p id="ingredients_r">${ingredients_recipes}</p></td>
    <td><p id="preparation_r">${preparation_recipes}</p></td>
    <td>${recipe.type}</td>
    <td><p id="description_r">${recipe.description}</p></td>
    <td><span id="editDelRecipeIcon" class="material-symbols-rounded">edit</span></td>
    <td><span id="editDelRecipeIcon" class="material-symbols-rounded">delete</span></td>
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

function logic_recipe(dataRecipe){
    let ingredients = []
    let instructions = []
    let findRecipe = 0
    let index = 0
    const button_Ingredient = document.querySelector('.addIngredient')
    const button_Description = document.querySelector('.addDescription')
    const name_recipe = document.querySelector('#input_name')
    const input_tempo = document.querySelector('#input_tempo')
    const input_ingredients = document.querySelector('.input_ingredients')
    const input_instructions = document.querySelector('.input_instructions')
    const input_description = document.querySelector('.food_description')
    const showListDes = document.querySelector('.showListDes')
    const showListIng = document.querySelector('.showListIng')
    const exlAllIngredient = document.querySelector('.exlAllIngredient')
    const exlAllDescriptions = document.querySelector('.exlAllDescriptions')
    const buttonEnv = document.querySelector('.envio_button')

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
    
    input_instructions.addEventListener('input', (event)=>{
        event.preventDefault();
        input_ingredients.value = input_ingredients.value.replace(/[\031-\037]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\041-\055]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\072-\100]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\133-\140]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\173-\277]/g, "")
    })

    button_Ingredient.addEventListener('click', (event)=>{
        if (button_Ingredient.innerText == 'Adicionar ingrediente') {
            event.preventDefault();
            showListIng.innerHTML = ''
            ingredients.push(input_ingredients.value)
            input_ingredients.value = ``
            for (let i = 0; i < ingredients.length; i++) {
                const liIng = document.createElement('li')
                showListIng.appendChild(liIng)
                liIng.innerHTML = ingredients[i]
            }
        }

        if (button_Ingredient.innerText == 'Editar ingrediente') {
            event.preventDefault()
            ingredients.splice(index, 1, input_ingredients.value)
            input_ingredients.value = ''
            showListIng.innerHTML= ''
            for (let i = 0; i < instructions.length-2; i++) {
                const liIng = document.createElement('li')
                showListIng.appendChild(liIng)
                liIng.innerHTML = `<span class="material-symbols-rounded" id="editLiIng">edit</span>${ingredients[i]}`
            }
        }
    })
    
    button_Description.addEventListener('click', (event)=>{
        event.preventDefault();
        if (button_Description.innerText == 'Adicionar instrução') {
            showListDes.innerHTML = ''
            instructions.push(input_instructions.value)
            input_instructions.value = ``
            for (let i = 0; i < instructions.length; i++) {
                const liDes = document.createElement('li')
                showListDes.appendChild(liDes)
                liDes.innerHTML = instructions[i]
                liDes.setAttribute("class", "litDes")
            }
        }
        if (button_Description.innerText == 'Editar instrução') {
            console.log(index)
            instructions.splice(index, 1, input_instructions.value)
            input_instructions.value = ''
            showListDes.innerHTML= ''
            for (let i = 0; i < instructions.length; i++) {
                const liDes = document.createElement('li')
                showListDes.appendChild(liDes)
                liDes.innerHTML = `<span class="material-symbols-rounded" id="editLiIng">edit</span>${instructions[i]}`
            }
        }
    })

    exlAllIngredient.addEventListener('click', (event)=>{
        event.preventDefault();
        showListIng.innerHTML = ''
    })

    exlAllDescriptions.addEventListener('click', (event)=>{
        event.preventDefault();
        showListIng.innerHTML = ''
    })
    
    
    buttonEnv.addEventListener('click', (event)=>{
        event.preventDefault();
        const id_planet = document.querySelector('#planet_select').value
        const name = document.querySelector('#input_name').value
        const description = document.querySelector('.food_description').value
        const type = document.querySelector('#type_select').value
        const time = document.querySelector('#input_tempo').value
        const nameRG = name.replace(/ /g, "")
        const image = `../img/recipe/receita-${nameRG}.png`
        post_recipes(id_planet, name, description, type, image, time, ingredients, instructions)
        //Reset
        name = ''
        description = ''
        type = ''
        time = ''
        showListIng.innerHTML = ''
        showListDes.innerHTML = ''
    })

    addEventEditDel(dataRecipe)
    function addEventEditDel(dataRecipe) {
        const buttonEditDel = document.querySelectorAll('#editDelRecipeIcon')
        buttonEditDel.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                if (event.target.innerText === "edit") {
                    button.value = "Editar receita"
                    const cellId = parseInt(event.target.parentElement.parentElement.cells[0].innerText)
                    findRecipe = dataRecipe.data.find(recipe => recipe.id===cellId)
                    console.log(findRecipe)
                    name_recipe.value = findRecipe.name
                    input_tempo.value = findRecipe.type
                    input_description.value = findRecipe.description
                    showListIng.innerHTML = ''
                    button_Ingredient.innerText = 'Editar ingrediente'
                    button_Description.innerText = 'Editar instrução'
                    buttonEnv.value = 'Editar receita'
                    exlAllDescriptions.style.display = 'none'
                    exlAllIngredient.style.display = 'none'
                    for (let i = 0; i < findRecipe.ingredient.length; i++) {
                        ingredients.push(findRecipe.ingredient[i])
                        const liIng = document.createElement('li')
                        showListIng.appendChild(liIng)
                        liIng.innerHTML = `<span class="material-symbols-rounded" id="editLiIng">edit</span>${findRecipe.ingredient[i]}`
                    }
                    showListDes.innerHTML = ''
                    for (let i = 0; i < findRecipe.instructions.length; i++) {
                        instructions.push(findRecipe.instructions[i])
                        const liDes = document.createElement('li')
                        showListDes.appendChild(liDes)
                        liDes.innerHTML = `<span class="material-symbols-rounded" id="editLiDes">edit</span>${findRecipe.instructions[i]}`
                    }
                    const editLiIng = document.querySelectorAll('#editLiIng')
                    editLiIng.forEach(li => {
                        li.addEventListener('click', (event) => {
                            const gerLiIng = event.target.nextSibling.textContent
                            input_ingredients.value = gerLiIng
                            index = ingredients.indexOf(gerLiIng)
                        })
                    });
                    const editLiDes = document.querySelectorAll('#editLiDes')
                    editLiDes.forEach(li => {
                        li.addEventListener('click', (event) => {
                            const getLiDes = event.target.nextSibling.textContent
                            input_instructions.value = getLiDes
                            index = instructions.indexOf(getLiDes)
                        })
                    });
                }

                if (event.target.innerText === "delete") {
                    const cellId = parseInt(event.target.parentElement.parentElement.cells[0].innerText)
                    console.log(cellId)
                    reRenderTable(cellId)
                }
        })});
        const tbody = document.querySelector('#tbody')
        async function reRenderTable (cellId) {
            await delete_recipes(cellId)
            const dataRecipe = get_recipes()
            tbody.innerHTML = registerrecipe(dataRecipe.data)
            addEvent()
        }
    }
}

/* function upload_receitaImg() {
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
} */