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
let ingredients = []
let instructions = []

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
                <select id="planet_select" required>
                        <option value="">Selecione o planeta:</option>
                        ${add_OP_planets}
                </select>
            </div>
            <div class="inputImgTypeContainer">
                <div class="inputImgContainer">
                    <label>Imagem da receita:</label>
                    <div class="div_image">
                        <input type="file" id="input_image_receita" required>
                    </div>
                </div>
                <div class="inputTypeContainer">
                    <label>Tipo da Receita:</label>
                    <select id="type_select" required>
                        <option value="">Selecione o tipo:</option>
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
                        <input type="text" class="inputText" id="input_name" maxlength="32" required>
                    </div>
                </div>
                <div class="typeContainer">
                    <label>Tempo de preparo:</label>
                    <div class="div_input">
                        <input type="text"  class="inputText" id="input_tempo" maxlength="11" required>
                    </div>
                </div>
            </div>

            <div class="div_input">
                <label>Descrição do Prato:</label>
                <div class="div_input">
                    <input type="text"  class="food_description"" maxlength="50" required>
                </textarea>
                </div>
            </div>
            
            <div class="ingDesContainer">
                <div class="ingContainer">
                    <label>Adicione um ingrediente por vez:</label>
                    <div class="div_input">
                        <input type="text" class="input_ingredients" maxlength="100" >
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
                        <input type="text" class="input_instructions" maxlength="100" > 
                    </div>
                    <div class="showListDesContainer">
                        <ul class="showListDes">
                        </ul>
                    </div>
                    <button class="addDescription">Adicionar instrução</button>
                    <button class="exlAllDescriptions">Excluir todos as instruções</button>
                </div>
            </div>
            <p class="textError"></p>
            <div class="buttonContainerRecipe">
                <input type="submit" class="envio_button" value="Adicionar receita">
                <input type="button" class="exitEdit" value="Cancelar edição">
            </div>
            <section>
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

let index = 0

function logic_recipe(dataRecipe){

    const button_Ingredient = document.querySelector('.addIngredient')
    const button_Description = document.querySelector('.addDescription')
    const name_recipe = document.querySelector('#input_name')
    const input_tempo = document.querySelector('#input_tempo')
    const input_ingredients = document.querySelector('.input_ingredients')
    const input_instructions = document.querySelector('.input_instructions')
    const showListDes = document.querySelector('.showListDes')
    const showListIng = document.querySelector('.showListIng')
    const exlAllIngredient = document.querySelector('.exlAllIngredient')
    const exlAllDescriptions = document.querySelector('.exlAllDescriptions')
    const buttonEnv = document.querySelector('.envio_button')
    const id_planet = document.querySelector('#planet_select').value
    const description = document.querySelector('.food_description')

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
        input_ingredients.value = input_ingredients.value.replace(/[\041-\047]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\052-\055]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\072-\100]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\133-\140]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\173-\277]/g, "")
    })
    
    input_instructions.addEventListener('input', (event)=>{
        event.preventDefault();
        input_ingredients.value = input_ingredients.value.replace(/[\031-\037]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\041-\047]/g, "")
        input_ingredients.value = input_ingredients.value.replace(/[\052-\055]/g, "")
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
            addEventLi(ingredients, instructions)
            console.log(index)
            console.log(ingredients)
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
            instructions.splice(index, 1, input_instructions.value)
            input_instructions.value = ''
            showListDes.innerHTML= ''
            for (let i = 0; i < instructions.length; i++) {
                const liDes = document.createElement('li')
                showListDes.appendChild(liDes)
                liDes.innerHTML = `<span class="material-symbols-rounded" id="editLiIng">edit</span>${instructions[i]}`
            }
            addEventLi(ingredients, instructions)
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

    addEventEditDel(dataRecipe, ingredients, instructions)

}

function addEventEditDel(dataRecipe, ingredients, instructions) {
    const arrayTypes = ["Salada", "Sobremesa", "Prato principal", "Entrada"]
    let findRecipe = 0
    const button_Ingredient = document.querySelector('.addIngredient')
    const button_Description = document.querySelector('.addDescription')
    const name_recipe = document.querySelector('#input_name')
    const input_tempo = document.querySelector('#input_tempo')
    const input_description = document.querySelector('.food_description')
    const input_type = document.querySelector('#type_select')
    const showListDes = document.querySelector('.showListDes')
    const showListIng = document.querySelector('.showListIng')
    const exlAllIngredient = document.querySelector('.exlAllIngredient')
    const exlAllDescriptions = document.querySelector('.exlAllDescriptions')
    const buttonEnv = document.querySelector('.envio_button')
    const buttonEditDel = document.querySelectorAll('#editDelRecipeIcon')
    const exitEdit = document.querySelector('.exitEdit')
    buttonEditDel.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.innerText === "edit") {
            button.value = "Editar receita"
            const cellId = parseInt(event.target.parentElement.parentElement.cells[0].innerText)
            findRecipe = dataRecipe.data.find(recipe => recipe.id===cellId)
            console.log(findRecipe)
            name_recipe.value = findRecipe.name
            console.log(input_type)
            console.log(input_type.option)
            input_tempo.value = findRecipe.time
            input_description.value = findRecipe.description
            showListIng.innerHTML = ''
            button_Ingredient.innerText = 'Editar ingrediente'
            button_Description.innerText = 'Editar instrução'
            buttonEnv.value = 'Editar receita'
            exlAllDescriptions.style.display = 'none'
            exlAllIngredient.style.display = 'none'
            exitEdit.style.display = 'block'
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
            addEventLi(ingredients, instructions)
            exitEdit.addEventListener ('click', () => {
                name_recipe.value = ''             
                input_description.value = ''             
                input_type.value = 0             
                input_tempo.value = ''             
                showListIng.innerHTML = ''             
                showListDes.innerHTML = '' 
                buttonEnv.value = 'Adicionar receita'
                exitEdit.style.display = 'none'
                exlAllDescriptions.style.display = 'initial'
                exlAllIngredient.style.display = 'initial'
            })
        }

        if (event.target.innerText === "delete") {
            const cellId = parseInt(event.target.parentElement.parentElement.cells[0].innerText)
            reRenderDelTable(cellId)
        }
    })});
    
    
}

async function reRenderDelTable (cellId) {
    const tbody = document.querySelector('#tbody')
    await delete_recipes(cellId)
    const dataRecipe = get_recipes()
    tbody.innerHTML = registerrecipe(dataRecipe.data)
    addEventEditDel(dataRecipe.data)
}

function addEventLi(ingredients, instructions) {
    const input_ingredients = document.querySelector('.input_ingredients')
    const input_instructions = document.querySelector('.input_instructions')
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


function upload_receitaImg() {
    const submitButton = document.querySelector('.envio_button')
    const form = document.querySelector('.form_envio')  
    const recipeName = document.querySelector('#input_name')    
    const id_planet = document.querySelector('#planet_select')    
    const image_receita = document.querySelector('#input_image_receita')    
    const type = document.querySelector('#type_select')    
    const time = document.querySelector('#input_tempo')    
    const description = document.querySelector('.food_description')

    const textError = document.querySelector('.textError')
 


    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData();   
        const nameRG = recipeName.value.replace(/ /g, "")   
        if (submitButton.value === 'Adicionar receita') {

            // console.log("ingredients:",Ingredients)
            // console.log("instructions:",Instructions)
            formData.append('file', image_receita.files[0], `receita-${nameRG}.png`);
            formData.append('id_planet', `${id_planet.value}`)
            formData.append('name', `${recipeName.value}`)
            formData.append('description', description.value)
            formData.append('type', type.vale)
            formData.append('image', `receita-${nameRG}.png`)
            formData.append('time', time.value)
            formData.append('ingredients', ingredients)
            formData.append('instructions', instructions)
            // submitButton.disabled = true;
        //     const nameRG = name.value.replace(/ /g, "")    
        //         formData.append('file', imageRecipe.files[0], `receita-${nameRG}.png`);

    
            fetch('/addrecipe', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then((response)=>{
                if(response.error!==null){
                    throw 'Error'
                }})
            .then(() =>{
                return get_recipes()})
            .then( dataRecipe =>{
                //está adicionando falta reinderizar a tabela de novo
                
                textError.innerHTML = `Receita adicionada com sucesso!`;
                textError.style.color = 'green';
                setTimeout(() => {
                    textError.innerHTML = ''
                }, 5000);
                submitButton.disabled = false
                recipeName.value = ``
                image_receita.value = ``
                time.value = ``
                description.value = ``
                id_planet.value = ""
                type.value = ""
                ingredients = []
                instructions = []
            })
            .catch(error => {
                submitButton.disabled = false
                console.error(error)});
             
        // if (submitButton.value === 'Editar Receita') {
            // }
        }     
    });   
}

