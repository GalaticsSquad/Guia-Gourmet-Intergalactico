// // @author {João}
// //@coauthor {Carolina}

import {insertHeader, logicHeader} from "./header.js";
import {EventCustom} from "../eventCustom.js";
import { get_planets, del_planets } from "../src/fetch/planet.js";
import { get_recipes } from "../src/fetch/recipes.js";

export default async function renderAddPlanet() {
    try {
        const dataPlanet = await get_planets()
        const dataRecipe = await get_recipes()
        const addPlanet = addplanet (dataPlanet.data)
        const root = document.getElementById('root')
        root.innerHTML = ``
        root.appendChild(addPlanet);
        logic_addPlanet(dataPlanet.data)
        uploadImages()
        logicHeader(dataPlanet.data, dataRecipe.data)
    } catch (error) {
        const evento = EventCustom("/login");
        root.dispatchEvent(evento);
    }
} 
let id = ``
function addplanet (data) {
    const container = document.createElement("div");
    const header = insertHeader();
    const gentable = registerplanet(data)
    container.className = "rootContainerAddPlanets"
    container.innerHTML = ` 
        <header>${header}</header>
        <div class="formTableAddPlanetContainer">
            <form class="container-addplanet">
                <div id="planet-name">
                    <label class="name-label" for="nome do Planeta">Nome do Planeta:</label>
                    <input type="text" class="input-name-planet" name="username" maxlength="25" required>
                </div>
                <div class="back-img">
                    <label class="label-back-img" for="check_back">Imagem do Fundo:</label>
                    <input type="file" class="input-addplanet" id="imagebackground" name="username" required>
                    <label class="label-check" class="label_icon" for="check_back">Deseja alterar o background?</label>
                    <input type="checkbox" class="input_check" class="check_back"  name="check_back">
                </div>
                <div class="back-img">
                    <label class="label-back-img" for="img do icone">Imagem do icone:</label >
                    <input type="file" class="input-addplanet" id="imageicon" name="username" required>
                    <label class="label-check" for="check_icon">Deseja alterar o ícone?</label>
                    <input type="checkbox" class="input_check" class="check_icon" name="check_icon">
                </div>
                <div id="description">
                    <label class="name-label" for="Descrição">Descrição do Planeta:</label>
                    <textarea name="" id="planet_description" cols="100" required rows="8" maxlength="800"></textarea>
                </div>
                <p class="textErrorPlanets"></p>
                <div class="buttonContainerPlanets">
                    <input type="submit" class="send-planet" value="Adicionar planeta">
                    <input type="button" class="exitEdit" value="Adicionar uma receita">
                </div>
            </form>
            <section id="section-lista">
            <table id="table" class="mini_table">
                <thead>
                    <tr id="table-heading">
                        <th class="id-number">#ID</th>
                        <th class="nome">Nome</th>
                        <th class="e-mail">Ícone</th>
                        <th class="editar">Background</th>
                        <th class="excluir">Descrição</th>
                        <th class="editar">Editar</th>
                        <th class="excluir">Excluir</th>
                    </tr>
                </thead>
                <tbody id="tbody" class="tbodyAddplanet">${gentable}</tbody>
            </table>
        </section>
        </div>`
    return container
}

function logic_addPlanet(dataPlanet){
    const name = document.querySelector('.input-name-planet')
    const root = document.querySelector('#root')
    const exitEdit = document.querySelector('.exitEdit')
    const description = document.querySelector('#planet_description')
    const imagebackground = document.querySelector('#imagebackground')
    const imageicon = document.querySelector('#imageicon')
    const sendPlanet = document.querySelector('.send-planet')
    addEvent(dataPlanet)
    name.addEventListener('input', (event)=>{
        event.preventDefault();
        name.value = name.value.replace(/[\031-\037]/g, "")
        name.value = name.value.replace(/[\041-\057]/g, "")
        name.value = name.value.replace(/[\072-\100]/g, "")
        name.value = name.value.replace(/[\133-\140]/g, "")
        name.value = name.value.replace(/[\173-\377]/g, "")
    })

    exitEdit.addEventListener('click', () => {
        if (exitEdit.value == "Adicionar uma receita") {
            const evento = EventCustom("/addRecipes");
            root.dispatchEvent(evento);
        }
        if (exitEdit.value == "Cancelar edição") {
            name.value=``
            description.value = ``
            imageicon.value = ``
            imagebackground.value=``
            reStyleInputFile()
            exitEdit.value = "Adicionar uma receita"
            sendPlanet.value = "Adicionar planeta"
            imagebackground.required= true
            imageicon.required=true
        }
    })
}

function uploadImages() {
    const textError = document.querySelector('.textErrorPlanets')
    const tbody = document.querySelector('#tbody')
    const form = document.querySelector('.container-addplanet')
    const enviarPlanet = document.querySelector('.send-planet')
    const name = document.querySelector('.input-name-planet')
    const imageBackground = document.querySelector('#imagebackground')
    const imageIcon = document.querySelector('#imageicon')
    const description = document.querySelector('#planet_description')
    const sendPlanet = document.querySelector('.send-planet')
    const exitEdit = document.querySelector('.exitEdit')
    const root = document.querySelector('#root')

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        root.style.cursor = 'wait'
        enviarPlanet.style.cursor = 'wait'
        // enviarPlanet.disabled = true
        const formData = new FormData();  
        const nameRG = name.value.replace(/ /g, "") 


        if(enviarPlanet.value === 'Adicionar planeta') {
            formData.append('file', imageBackground.files[0], `background-${nameRG}.png`);
            formData.append('file', imageIcon.files[0], `icon-${nameRG}.png`);
            formData.append('name', `${name.value}`)
            formData.append('background', `../uploads/background-${nameRG}.png`)
            formData.append('icon', `../uploads/icon-${nameRG}.png`)
            formData.append('description', description.value)

            fetch('/addplanet', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then((response)=>{
                console.log(response)
                if(response.error!==null){
                    throw `Error: ${response.error}!`;

                }})
            .then(() =>{
                return get_planets()})
            .then((dataPlanet)=>{
                tbody.innerHTML = ''
                tbody.innerHTML = registerplanet(dataPlanet.data)
                addEvent(dataPlanet.data)
                textError.innerHTML = `Planeta adicionado com sucesso!`;
                textError.style.color = 'green';
                setTimeout(() => {
                    textError.innerHTML = ''
                }, 5000);
                enviarPlanet.style.cursor = 'auto'
                root.style.cursor = 'auto'
                enviarPlanet.disabled = false
                name.value=``
                description.value = ``
                imageIcon.value = ``
                imageBackground.value=``})
            .catch(error => {
                textError.innerHTML = `${error}!`;
                textError.style.color = 'red';
                setTimeout(() => {
                    textError.innerHTML = ''
                }, 5000);
                enviarPlanet.style.cursor = 'auto'
                enviarPlanet.disabled = false
                root.style.cursor = 'auto'
                console.error(error)});
        }

        if (enviarPlanet.value === 'Editar planeta') {
            

            if(imageBackground.files.length!==0){
                formData.append('file', imageBackground.files[0], `background-${nameRG}.png`);
            }else{
            let old_back = id.background.replace("../", "")
            formData.append('old_background', "../../public/"+old_back)
            }
              
            
            if(imageIcon.files.length !== 0) {
            formData.append('file', imageIcon.files[0], `icon-${nameRG}.png`);
            }else{
            let old_icon = id.icon.replace("../", "")
            formData.append('old_icon', "../../public/"+old_icon)
            }


        
            formData.append('name', name.value)
            formData.append('icon', `../uploads/icon-${nameRG}.png`)
            formData.append('background', `../uploads/background-${nameRG}.png`)
            formData.append('description', description.value)
    

            fetch(`/editplanet/${id.id}`, {
                method: 'PATCH',
                body: formData
            })
            .then(response => response.json())
            .then((response)=>{
                if(response.error!==null){
                    throw `Error: ${response.error}!`;
                }})
            .then(() =>{
                return get_planets()})
            .then( dataPlanet =>{

                tbody.innerHTML = ''
                tbody.innerHTML = registerplanet(dataPlanet.data)
                addEvent(dataPlanet.data)
                reStyleInputFile()
                exitEdit.value = "Adicionar uma receita"
                textError.innerHTML = `Planeta editado com sucesso!`;
                textError.style.color = 'green';
                setTimeout(() => {
                    textError.innerHTML = ''
                }, 5000);
                enviarPlanet.style.cursor = 'auto'
                root.style.cursor = 'auto'
                enviarPlanet.disabled = false
                sendPlanet.value = "Adicionar planeta"
                name.value=``
                description.value = ``
                imageIcon.value = ``
                imageBackground.value=``})
            .catch(error => {
                textError.innerHTML = `${error}`;
                textError.style.color = 'red';
                setTimeout(() => {
                    textError.innerHTML = ''
                }, 5000);
                enviarPlanet.disabled = false
                enviarPlanet.style.cursor = 'auto'
                root.style.cursor = 'auto'
                console.error(error)});
        }
    });      

};     

function registerplanet(dataPlanet) {
    let table_planet = "";
    dataPlanet.forEach((planet) => {
        table_planet += `<tr class="editplanet_table">
        <td>${planet.id}</td>
        <td>${planet.name}</td>
        <td><img class="imgTablePlanetsIcon" src="../${planet.icon}"></td>
        <td><img class="imgTablePlanetsBack" src="../${planet.background}"></td>
        <td id="tb_description"><p id="description_p">${planet.description}</p></td>
        <td><a href="#root" class="material-symbols-rounded">
        edit</a></td>
        <td><a href="#root" class="material-symbols-rounded">
        delete</a></td>
        </tr>`;
    });
    return table_planet;
}

function addEvent(dataPlanet) {
    const name = document.querySelector('.input-name-planet')
    const description = document.querySelector('#planet_description')
    const buttonEditDel = document.querySelectorAll('.material-symbols-rounded')
    const imagebackground = document.querySelector('#imagebackground')
    const imageicon = document.querySelector('#imageicon')
    const sendPlanet = document.querySelector('.send-planet')
    const exitEdit = document.querySelector('.exitEdit')
    
    buttonEditDel.forEach(button => {
        button.addEventListener('click', (event) => {
            if (event.target.innerText === "edit") {
                sendPlanet.value = "Editar planeta"
                const cellId = parseInt(event.target.parentElement.parentElement.cells[0].innerText)
                const findPlanet = dataPlanet.find(planet => planet.id===cellId)
                name.value = findPlanet.name
                description.value = findPlanet.description
                id = findPlanet
                exitEdit.value = "Cancelar edição"
                imagebackground.removeAttribute("required")
                imageicon.removeAttribute("required")
                styleInputFile()
            }
            if (event.target.innerText === "delete") {
                const cellId = parseInt(event.target.parentElement.parentElement.cells[0].innerText)
                reRenderDelTable(cellId)
            }
    })});
}

async function reRenderDelTable (cellId) {
    const tbody = document.querySelector('#tbody')
    const textError = document.querySelector('.textErrorPlanets')
    try {
        await del_planets(cellId)
        const dataPlanet = await get_planets()
        tbody.innerHTML = registerplanet(dataPlanet.data)
        addEvent(dataPlanet.data)
        textError.innerText = "Planeta deletado com sucesso!"
        textError.style.color = 'green';
        setTimeout(() => {
            textError.innerHTML = ''
        }, 4000);
    } catch (error) {
        textError.innerText = "Error: " + error.message
        textError.style.color = 'red';
    }
    
}

function styleInputFile() {
    const labels = document.querySelectorAll('.label-check')
    const inputs = document.querySelectorAll('.input_check')
    const label_back = document.querySelectorAll('.label-back-img')
    const input_back = document.querySelectorAll('.input-addplanet')
    for (let i = 0; i < labels.length; i++) {
        labels[i].style.display = 'block'
        inputs[i].style.display = 'block'
        label_back[i].style.opacity = '0.25'
        input_back[i].style.opacity = '0.25'
        input_back[i].disabled = true
        inputs[i].addEventListener( 'change', function() {
            if(this.checked) {
                label_back[i].style.opacity = '1'
                input_back[i].style.opacity = '1'
                input_back[i].disabled = false
            } else {
                label_back[i].style.opacity = '0.25'
                input_back[i].style.opacity = '0.25'
                input_back[i].disabled = true
            }
        });
    }
}

function reStyleInputFile() {
    const labels = document.querySelectorAll('.label-check')
    const inputs = document.querySelectorAll('.input_check')
    const label_back = document.querySelectorAll('.label-back-img')
    const input_back = document.querySelectorAll('.input-addplanet')
    for (let i = 0; i < labels.length; i++) {
        labels[i].style.display = 'none'
        inputs[i].style.display = 'none'
        label_back[i].style.opacity = '1'
        input_back[i].style.opacity = '1'
        input_back[i].disabled = false
    }
}