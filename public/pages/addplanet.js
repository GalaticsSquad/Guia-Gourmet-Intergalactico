// // @author {João}
// //@coauthor {Carolina}

import {insertHeader, logicHeader} from "./header.js";
import { get_planets, post_planets, patch_planets , del_planets } from "../src/fetch/planet.js";
import { get_recipes } from "../src/fetch/recipes.js";

export default async function renderAddPlanet() {
    const dataPlanet = await get_planets()
    const dataRecipe = await get_recipes()
    const addPlanet = addplanet (dataPlanet.data)
    const root = document.getElementById('root')
    root.innerHTML = ``
    root.appendChild(addPlanet);
    logic_addPlanet(dataPlanet.data)
    uploadImages()
    logicHeader(dataPlanet.data, dataRecipe.data)
} 
let id = ``
function addplanet (data) {
    const container = document.createElement("div");
    const header = insertHeader();
    const gentable = registerplanet(data)
    container.className = "rootContainerAddPlanets"
    container.innerHTML = ` 
        <header>${header}</header>
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
            <input type="submit" class="send-planet" id="push_planet" value="Adicionar Planeta">
            <div id="containertextErrorPlanets">
                <p class="textErrorPlanets"></p>
            </div>
        </form>
        <section id="section-lista">
            <table id="table" class="mini_table">
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
        `
        
    return container
}

function logic_addPlanet(dataPlanet){
    const tbody = document.querySelector('#tbody')
    const name = document.querySelector('.input-name-planet')
    const enviarPlanet = document.querySelector('.send-planet')
    let findPlanet = 0

    addEvent()
    function addEvent() {
        const labels = document.querySelectorAll('.label-check')
        const inputs = document.querySelectorAll('.input_check')
        const label_back = document.querySelectorAll('.label-back-img')
        const input_back = document.querySelectorAll('.input-addplanet')
        const description = document.querySelector('#planet_description')
        const buttonEditDel = document.querySelectorAll('.material-symbols-rounded')
        const imagebackground = document.querySelector('#imagebackground')
        const imageicon = document.querySelector('#imageicon')
        
        buttonEditDel.forEach(button => {
            button.addEventListener('click', (event) => {
                if (event.target.innerText === "edit") {
                    enviarPlanet.value = "Editar planeta"
                    const cellId = parseInt(event.target.parentElement.parentElement.cells[0].innerText)
                    
                    findPlanet = dataPlanet.find(planet => planet.id===cellId)
                    name.value = findPlanet.name
                    description.value = findPlanet.description
                    id = findPlanet
                    imagebackground.removeAttribute("required")
                    imageicon.removeAttribute("required")
                    console.log(imagebackground)
                    for (let i = 0; i < labels.length; i++) {
                        labels[i].style.display = 'block'
                        inputs[i].style.display = 'block'
                        label_back[i].style.opacity = '0.25'
                        input_back[i].style.opacity = '0.25'
                        inputs[i].addEventListener( 'change', function() {
                            if(this.checked) {
                                label_back[i].style.opacity = '1'
                                input_back[i].style.opacity = '1'
                            } else {
                                label_back[i].style.opacity = '0.25'
                                input_back[i].style.opacity = '0.25'
                            }
                        });
                    }
                    console.log(findPlanet)
                }
                if (event.target.innerText === "delete") {
                    const cellId = parseInt(event.target.parentElement.parentElement.cells[0].innerText)
                    reRenderTable(cellId)
                }
        })});
    }

    async function reRenderTable (cellId) {
        await del_planets(cellId)
        const dataPlanet = await get_planets()
        tbody.innerHTML = registerplanet(dataPlanet)
        addEvent()
    }

    name.addEventListener('input', (event)=>{
        event.preventDefault();
        name.value = name.value.replace(/[\031-\037]/g, "")
        name.value = name.value.replace(/[\041-\057]/g, "")
        name.value = name.value.replace(/[\072-\100]/g, "")
        name.value = name.value.replace(/[\133-\140]/g, "")
        name.value = name.value.replace(/[\173-\277]/g, "")
    })


    // post_planets(_name, _icon, _background, _description)
    // enviarPlanet.addEventListener('click', () => {
    //     // event.preventDefault()
    //     if (enviarPlanet.value == "Adicionar Planeta") {
    //         const name = document.querySelector('.input-name-planet').value
    //         const description = document.querySelector('#planet_description').value
    //         const nameRG = name.replace(/ /g, "")
    //         const background = `../uploads/background-${nameRG}.png`;
    //         const icon = `../uploads/icon-${nameRG}.png`;

    //         // Post no DB
    //         post_planets(name, icon, background, description)
    //     }
    //     if (enviarPlanet.value == "Editar planeta") {
    //         const checks = document.querySelectorAll('.input_check')
    //         const check_back = checks[0]
    //         const check_icon = checks[1]
    //         console.log("find:", findPlanet)
    //         const nameRG = name.value.replace(/ /g, "")
    //         let background = `../uploads/background-${nameRG}.png`;
    //         let icon = `../uploads/icon-${nameRG}.png`;

    //         if (check_back.checked) {
    //             background = findPlanet.background
    //         }
            
    //         console.log(name.value, icon, background, description.value)
    //         enviarPlanet.value = "Adicionar Planeta"
            // Post no DB
            /* patch_planets(findPlanet.id ,name.value, icon, background, description.value) */
    //     }
    // })
}

// function uploadImages() {
//     // const form = document.querySelector('.container-addplanet')
//     // event.preventDefault();

//     const name = document.querySelector('.input-name-planet').value
//     const imageBackground = document.querySelector('#imagebackground');
//     const imageIcon = document.querySelector('#imageicon');

//     const formData = new FormData();    

//     const nameRG = name.replace(/ /g, "")    

//         formData.append('file', imageBackground.files[0], `background-${nameRG}.png`);
//         formData.append('file', imageIcon.files[0], `icon-${nameRG}.png`);
    
//     fetch('/img', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
        
// };
    // Upload das imagens (Background e Icon)
    // form.addEventListener('submit', (event) => {
       
    // };  
    

/* ----------------------ONTEM----------------- */

function uploadImages() {
    const form = document.querySelector('.container-addplanet')
    const enviarPlanet = document.querySelector('.send-planet')
    const name = document.querySelector('.input-name-planet')
    const imageBackground = document.querySelector('#imagebackground')
    const imageIcon = document.querySelector('#imageicon')
    const description = document.querySelector('#planet_description')
    console.log(imageBackground)

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData();  
        const nameRG = name.value.replace(/ /g, "")   

        if(enviarPlanet.value === 'Adicionar Planeta') {
            formData.append('file', imageBackground.files[0], `background-${nameRG}.png`);
            formData.append('file', imageIcon.files[0], `icon-${nameRG}.png`);
            formData.append('name', `${name.value}`)
            formData.append('background', `../uploads/background-${nameRG}.png`)
            formData.append('icon', `../uploads/icon-${nameRG}.png`)
            formData.append('description', description.value)
            enviarPlanet.disabled = true;
            
            fetch('/addplanet', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            // .then(data => data.json())
            .then((response)=>{
                if(response.error!==null){
                    throw 'Error'
                }
                const  successMessage =  document.querySelector('.textErrorPlanets')
                successMessage.innerHTML = `Planeta adicionado com sucesso!`;
                successMessage.style.color = 'green';
                setTimeout(() => {
                    successMessage.innerHTML = ''
                }, 5000);
                enviarPlanet.disabled = false
                name.value=``
                description.value = ``
                imageIcon.value = ``
                imageBackground.value=``})
            .catch(error => {
                const  successMessage =  document.querySelector('.textErrorPlanets')
                successMessage.innerHTML = `Algo deu errado!`;
                successMessage.style.color = 'red';
                setTimeout(() => {
                    successMessage.innerHTML = ''
                }, 5000);
                enviarPlanet.disabled = false
                console.error(error)});
        }

        if (enviarPlanet.value === 'Editar planeta') {

            if(imageBackground.files.length!==0){
                formData.append('file', imageBackground.files[0], `background-${nameRG}.png`);
            }

            if(imageIcon.files.length !== 0) {
                formData.append('file', imageIcon.files[0], `icon-${nameRG}.png`);
            }
           let old_back = id.background.replace("../", "")
           let old_icon = id.icon.replace("../", "")
            
            formData.append('name', name.value)
            formData.append('icon', `../uploads/icon-${nameRG}.png`)
            formData.append('background', `../uploads/background-${nameRG}.png`)
            formData.append('description', description.value)
            formData.append('old_icon', "../../public/"+old_icon)
            formData.append('old_background', "../../public/"+old_back)



     
            console.log('ID:', id)



            fetch(`/editplanet/${id.id}`, {
                method: 'PATCH',
                body: formData
            })
            .then(response => response.json())
            // .then(data => data.json())
            .then((response)=>{
                if(response.error!==null){
                    throw 'Error'
                }
                const  successMessage =  document.querySelector('.textErrorPlanets')
                successMessage.innerHTML = `Planeta adicionado com sucesso!`;
                successMessage.style.color = 'green';
                setTimeout(() => {
                    successMessage.innerHTML = ''
                }, 5000);
                enviarPlanet.disabled = false
                name.value=``
                description.value = ``
                imageIcon.value = ``
                imageBackground.value=``})
            .catch(error => {
                const  successMessage =  document.querySelector('.textErrorPlanets')
                successMessage.innerHTML = `Algo deu errado!`;
                successMessage.style.color = 'red';
                setTimeout(() => {
                    successMessage.innerHTML = ''
                }, 5000);
                enviarPlanet.disabled = false
                console.error(error)});
            
        }
        
    });

        // const name = document.querySelector('.input-name-planet').value
        // const imageBackground = document.querySelector('#imagebackground');
        // const imageIcon = document.querySelector('#imageicon');


        

};     

function registerplanet(dataPlanet) {
    let table_planet = "";
    dataPlanet.forEach((planet) => {
        table_planet += `<tr class="editplanet_table">
        <td>${planet.id}</td>
        <td>${planet.name}</td>
        <td>${planet.icon}</td>
        <td>${planet.background}</td>
        <td id="tb_description"><p id="description_p">${planet.description}</p></td>
        <td><span class="material-symbols-rounded">
        edit</span></td>
        <td><span class="material-symbols-rounded">
        delete</span></td>
        </tr>`;
    });
    return table_planet;
}

