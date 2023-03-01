// // @author {Eduardo}
// //@coauthor {Carolina,João}
import {EventCustom} from "../eventCustom.js";
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
    logic_recipe(dataRecipe.data)
    upload_receitaImg()
    logicHeader(dataPlanet.data, dataRecipe.data)
}
let ingredients = []
let instructions = []
let objRecipe = ``
let index = 0

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
                        <option value="Prato principal">Prato Principal</option>
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
                    <input type="text"  class="food_description"" minlength="80" maxlength="110" required>
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
                <input type="button" class="exitEdit" value="Adicionar um planeta">
            </div>
            <section>
                <table id="table" class="tableAddRecipes">
                    <thead>
                        <tr id="table-heading">
                            <th class="id-number">#ID</th>
                            <th class="nome">IDPlanet</th>
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
    <td><img class="imgTableRecipes" src="../${recipe.image}"></td>
    <td>${recipe.time}</td>
    <td><p id="ingredients_r">${ingredients_recipes}</p></td>
    <td><p id="preparation_r">${preparation_recipes}</p></td>
    <td>${recipe.type}</td>
    <td><p id="description_r">${recipe.description}</p></td>
    <td><a href="#root" id="editDelRecipeIcon" class="material-symbols-rounded">edit</a></td>
    <td><a href="#root" id="editDelRecipeIcon" class="material-symbols-rounded">delete</a></td>
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

    const button_Ingredient = document.querySelector('.addIngredient')
    const button_Description = document.querySelector('.addDescription')
    const name_recipe = document.querySelector('#input_name')
    const input_tempo = document.querySelector('#input_tempo')
    const input_ingredients = document.querySelector('.input_ingredients')
    const input_instructions = document.querySelector('.input_instructions')
    const input_description = document.querySelector('.food_description')
    const input_type = document.querySelector('#type_select')
    const showListDes = document.querySelector('.showListDes')
    const showListIng = document.querySelector('.showListIng')
    const exlAllIngredient = document.querySelector('.exlAllIngredient')
    const exlAllDescriptions = document.querySelector('.exlAllDescriptions')
    const exitEdit = document.querySelector('.exitEdit')
    const root = document.getElementById('root')
    const buttonEnv = document.querySelector('.envio_button')
    const input_image_receita = document.querySelector('#input_image_receita')

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
        name_recipe.value = name_recipe.value.replace(/[\173-\377]/g, "")
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
        input_instructions.value = input_instructions.value.replace(/[\031-\037]/g, "")
        input_instructions.value = input_instructions.value.replace(/[\041-\047]/g, "")
        input_instructions.value = input_instructions.value.replace(/[\052-\055]/g, "")
        input_instructions.value = input_instructions.value.replace(/[\072-\100]/g, "")
        input_instructions.value = input_instructions.value.replace(/[\133-\140]/g, "")
        input_instructions.value = input_instructions.value.replace(/[\173-\277]/g, "")
    })
    
    
    exlAllIngredient.addEventListener('click', (event)=>{ //Limpar lista de ingredientes adicionados
        event.preventDefault();
        showListIng.innerHTML = ''
    })

    exlAllDescriptions.addEventListener('click', (event)=>{ //Limpar lista de instruções adicionadas
        event.preventDefault();
        showListIng.innerHTML = ''
    })

    exitEdit.addEventListener ('click', () => {
        if (exitEdit.value == "Adicionar um planeta") { //Ir para a página addplanet
            const evento = EventCustom("/addPlanet");
            root.dispatchEvent(evento);
        }
        if (exitEdit.value == "Cancelar edição") { //Cencelar edição
            name_recipe.value = ''             
            input_description.value = ''             
            input_type.value = 0             
            input_tempo.value = ''             
            showListIng.innerHTML = ''             
            showListDes.innerHTML = '' 
            buttonEnv.value = 'Adicionar receita'
            exitEdit.value = 'Adicionar um planeta'
            exlAllDescriptions.style.display = 'initial'
            exlAllIngredient.style.display = 'initial'
            button_Ingredient.innerText = 'Adicionar ingrediente'
            button_Description.innerText ='Adicionar instrução'
            input_image_receita.required = true
            ingredients = []
            instructions = []
        }
    })
    addEventButtonIngredient()
    addEventButtonInstructions()
    addEventEditDel(dataRecipe)
}

function addEventButtonIngredient() {
    const button_Ingredient = document.querySelector('.addIngredient')
    const showListIng = document.querySelector('.showListIng')
    const input_ingredients = document.querySelector('.input_ingredients')
    button_Ingredient.addEventListener('click', (event)=>{ 
        if (button_Ingredient.innerText == 'Adicionar ingrediente') {
            event.preventDefault()
            showListIng.innerHTML = ''
            ingredients.push(input_ingredients.value)
            input_ingredients.value = ``
            for (let i = 0; i < ingredients.length; i++) {
                const liIng = document.createElement('li')
                showListIng.appendChild(liIng)
                liIng.innerHTML = ingredients[i]
            }
            addEventLiIng(ingredients)
        }

        if (button_Ingredient.innerText == 'Editar ingrediente') {
            event.preventDefault()
            ingredients.splice(index, 1, input_ingredients.value)
            input_ingredients.value = ''
            showListIng.innerHTML= ''
            for (let i = 0; i < ingredients.length; i++) {
                const liIng = document.createElement('li')
                showListIng.appendChild(liIng)
                liIng.innerHTML = `<span class="material-symbols-rounded" id="editLiIng">edit</span>${ingredients[i]}`
            }
            addEventLiIng(ingredients)
        }
    })
}

function addEventButtonInstructions() {
    const button_Description = document.querySelector('.addDescription')
    const showListDes = document.querySelector('.showListDes')
    const input_instructions = document.querySelector('.input_instructions')
    button_Description.addEventListener('click', (event)=>{
        event.preventDefault();
        if (button_Description.innerText == 'Adicionar instrução') {
            console.log('Adicionar instrução')
            showListDes.innerHTML = ''
            instructions.push(input_instructions.value)
            input_instructions.value = ``
            for (let i = 0; i < instructions.length; i++) {
                const liDes = document.createElement('li')
                showListDes.appendChild(liDes)
                liDes.innerHTML = instructions[i]
            }
            addEventLiDes(instructions)
        }
        if (button_Description.innerText == 'Editar instrução') {
            console.log('linha 327 ', instructions)
            instructions.splice(index, 1, input_instructions.value)
            input_instructions.value = ''
            showListDes.innerHTML= ''
            for (let i = 0; i < instructions.length; i++) {
                const liDes = document.createElement('li')
                showListDes.appendChild(liDes)
                liDes.innerHTML = `<span class="material-symbols-rounded" id="editLiDes">edit</span>${instructions[i]}`
            }
            addEventLiDes(instructions)
        }
    })
}

function addEventEditDel(dataRecipe) {
    let findRecipe = 0
    const button_Ingredient = document.querySelector('.addIngredient')
    const button_Description = document.querySelector('.addDescription')
    const planet_select = document.querySelector('#planet_select')
    const name_recipe = document.querySelector('#input_name')
    const input_image_receita = document.querySelector('#input_image_receita')
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

    buttonEditDel.forEach(button => { //Para cada icone de editar e deletar add um event de acordo com o ícone
    button.addEventListener('click', (event) => {
        //event.preventDefault();
        console.log("addEventListener")
        ingredients.length = 0
        instructions = []
        console.log("addEventListener", ingredients)
        console.log("addEventListener", instructions)
        if (event.target.innerText === "edit") {
            button.value = "Editar receita"
            const cellId = parseInt(event.target.parentElement.parentElement.cells[0].innerText)
            findRecipe = dataRecipe.find(recipe => recipe.id===cellId)
            objRecipe = findRecipe
            console.log(findRecipe)
            planet_select.value = findRecipe.id_planet
            name_recipe.value = findRecipe.name
            input_tempo.value = findRecipe.time
            input_description.value = findRecipe.description
            input_type.value = findRecipe.type
            button_Ingredient.innerText = 'Editar ingrediente'
            button_Description.innerText = 'Editar instrução'
            buttonEnv.value = 'Editar receita'
            exlAllDescriptions.style.display = 'none'
            exlAllIngredient.style.display = 'none'
            exitEdit.value = 'Cancelar edição'
            input_image_receita.required = false
            showListIng.innerHTML = ''
            for (let i = 0; i < findRecipe.ingredient.length; i++) { //adciona a lista de ingredientes abaixo do input e adc a variável global
                ingredients.push(findRecipe.ingredient[i])
                const liIng = document.createElement('li')
                showListIng.appendChild(liIng)
                liIng.innerHTML = `<span class="material-symbols-rounded" id="editLiIng">edit</span>${findRecipe.ingredient[i]}`
            }
            console.log('linha 391 ', ingredients)
            addEventLiIng(ingredients)
            showListDes.innerHTML = ''
            for (let i = 0; i < findRecipe.instructions.length; i++) { //adciona a lista de instruções abaixo do input e adc a variável global
                instructions.push(findRecipe.instructions[i])
                const liDes = document.createElement('li')
                showListDes.appendChild(liDes)
                liDes.innerHTML = `<span class="material-symbols-rounded" id="editLiDes">edit</span>${findRecipe.instructions[i]}`
            }
            addEventLiDes(instructions) //Pega o index
        }

        if (event.target.innerText === "delete") {
            const cellId = parseInt(event.target.parentElement.parentElement.cells[0].innerText)
            reRenderDelTable(cellId)
        }
    })});
}

function addEventLiIng(ingredients) { // get the index of the ingredient/intruction clicked on editing
    const input_ingredients = document.querySelector('.input_ingredients')
    const editLiIng = document.querySelectorAll('#editLiIng')
    editLiIng.forEach(li => {
        li.addEventListener('click', (event) => {
            const gerLiIng = event.target.nextSibling.textContent
            input_ingredients.value = gerLiIng
            index = ingredients.indexOf(gerLiIng)
        })
    });
    console.log("addEventLiIng linha 421", ingredients)
}

function addEventLiDes(instructions) { //Pega o index da instrução que foi clicada na lista de intruções a serem editadas
    const input_instructions = document.querySelector('.input_instructions')
    const editLiDes = document.querySelectorAll('#editLiDes')
    editLiDes.forEach(li => {
        li.addEventListener('click', (event) => {
            const getLiDes = event.target.nextSibling.textContent
            input_instructions.value = getLiDes
            index = instructions.indexOf(getLiDes)
        })
    });
}

async function reRenderDelTable (cellId) {
    const textError = document.querySelector('.textError')
    const tbody = document.querySelector('#tbody')
    try {
        await delete_recipes(cellId)
        const dataRecipe = await get_recipes()
        console.log(dataRecipe.data)
        tbody.innerHTML = registerrecipe(dataRecipe.data)
        addEventEditDel(dataRecipe.data)
        textError.innerHTML = `Receita deletada com sucesso!`;
        textError.style.color = 'green';
        setTimeout(() => {
            textError.innerHTML = ''
        }, 4000);
        addEventLiIng(ingredients)
    } catch (error) {
        console.log("esse daqui:",error)
        textError.innerText = "Error: " + error.message
        textError.style.color = 'red';
    }
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
    const tbody = document.querySelector('#tbody')
    const textError = document.querySelector('.textError')
    const root = document.querySelector('#root')
    const showListDes = document.querySelector('.showListDes')
    const showListIng = document.querySelector('.showListIng')
    root.style.cursor = 'auto';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        submitButton.disabled = true
        submitButton.style.cursor = 'wait'
        root.style.cursor = 'wait'
        const formData = new FormData();   
        const nameRG = recipeName.value.replace(/ /g, "")   
        if (submitButton.value == 'Adicionar receita') {
            formData.append('file', image_receita.files[0], `receita-${nameRG}.png`);
            formData.append('id_planet', `${id_planet.value}`)
            formData.append('name', `${recipeName.value}`)
            formData.append('description', description.value)
            formData.append('type', type.value)
            formData.append('image', `/uploads/receita-${nameRG}.png`)
            formData.append('time', time.value)
            formData.append('ingredients', ingredients)
            formData.append('instructions', instructions)
            id_planet.value = "1"
            console.log('teste1')
            
        //     const nameRG = name.value.replace(/ /g, "")    
        //         formData.append('file', imageRecipe.files[0], `receita-${nameRG}.png`);
            fetch('/addrecipe', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then((response)=>{
                if(response.error!==null){
                    textError.innerHTML = `Algo deu errado!`;
                    textError.style.color = 'red';
                    setTimeout(() => {
                        textError.innerHTML = ''
                    }, 5000);
                    submitButton.disabled = false
                    root.style.cursor = 'auto'
                }})
            .then(() =>{
                return get_recipes()})
            .then( dataRecipe =>{
                tbody.innerHTML = registerrecipe(dataRecipe.data)
                addEventEditDel(dataRecipe.data)
                textError.innerHTML = `Receita adicionada com sucesso!`;
                textError.style.color = 'green';
                setTimeout(() => {
                    textError.innerHTML = ''
                }, 5000);
                submitButton.disabled = false
                submitButton.style.cursor = 'auto'
                root.style.cursor = 'auto'
                recipeName.value = ``
                image_receita.value = ``
                time.value = ``
                description.value = ``
                id_planet.value = ""
                type.value = ""
                showListIng.innerHTML = ''             
                showListDes.innerHTML = '' 
                ingredients = []
                instructions = []
                reRenderHeader()
            })
            .catch(error => {
                textError.innerHTML = `Algo deu errado!`;
                textError.style.color = 'red';
                setTimeout(() => {
                    textError.innerHTML = ''
                }, 5000);
                submitButton.disabled = false
                root.style.cursor = 'auto'
                submitButton.style.cursor = 'auto'
                console.error(error)
            });
        }
        if (submitButton.value == 'Editar receita') {
            console.log('ok')
            // let old_icon = id.icon.replace("../", "")
            // formData.append('old_icon', "../../public/"+old_icon)
            if(image_receita.files.length!==0){
                formData.append('file', image_receita.files[0], `receita-${nameRG}.png`);
            }

            formData.append('id_planet', `${id_planet.value}`)
            formData.append('name', `${recipeName.value}`)
            formData.append('description', description.value)
            formData.append('type', type.value)
            formData.append('image', objRecipe.image)
            formData.append('time', time.value)
            formData.append('ingredients', ingredients)
            formData.append('instructions', instructions)
            
            console.log('formdata', formData.getAll('ingredients'))
            console.log('formdata', formData.getAll('name'))

            fetch(`/editrecipe/${objRecipe.id}`, {
                method: 'PATCH',
                body: formData
            })
            .then(response => response.json())
            .then((response)=>{
                if(response.error!==null){
                    textError.innerHTML = `Algo deu errado!`;
                    textError.style.color = 'red';
                    setTimeout(() => {
                        textError.innerHTML = ''
                    }, 5000);
                    submitButton.disabled = false
                    root.style.cursor = 'auto'
                    submitButton.style.cursor = 'auto'
                    console.error(error)
            }})
            .then(() =>{
                return get_recipes()})
            .then( dataRecipe =>{
                tbody.innerHTML = registerrecipe(dataRecipe.data)
                addEventEditDel(dataRecipe.data)
                textError.innerHTML = `Receita editada com sucesso!`;
                textError.style.color = 'green';
                setTimeout(() => {
                    textError.innerHTML = ''
                }, 5000);
                submitButton.disabled = false
                submitButton.style.cursor = 'auto'
                root.style.cursor = 'auto'
                recipeName.value = ``
                image_receita.value = ``
                time.value = ``
                description.value = ``
                id_planet.value = ""
                type.value = ""
                showListIng.innerHTML = ''             
                showListDes.innerHTML = '' 
                ingredients = []
                instructions = []
                reRenderHeader()
            })
        }  
    });   
}

async function reRenderHeader() {
    const dataPlanet = await get_planets()
    const dataRecipe = await get_recipes()
    logicHeader(dataPlanet.data, dataRecipe.data)
}
