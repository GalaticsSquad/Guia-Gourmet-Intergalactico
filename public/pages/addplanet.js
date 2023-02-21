// // @author {João}
// //@coauthor {Carolina}

import {insertHeader, logicHeader} from "./header.js";
import { get_planets } from "../src/fetch/planet.js";

export default async function renderAddPlanet() {
    const dataPlanet = await get_planets()
    const addPlanet = addplanet ()
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
                <input type="text" class="input-name-planet" name="username">
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
                <div class="container_up">
                    <h2>LISTA DE USUÁRIOS CADASTRADOS</h2>
                    <p id="verUsuarios">Ver Usuários</p>
                </div>
                <table id="table">
                    <thead>
                        <tr id="table-heading">
                            <td class="id-number">#ID</td>
                            <td class="nome">NOME</td>
                            <td class="e-mail">E-MAIL</td>
                            <td class="editar">EDITAR</td>
                            <td class="excluir">EXCLUIR</td>
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

// const planetNameInput = document.querySelector(".input-name-planet")
// const image_background = document.querySelector("#imagebackground")
// const image_icon = document.querySelector("#imageicon")
// const planetdescription = document.querySelector("#planet_description")
// const buttonsendplanet = document.querySelector(".send-planet")
// const tbody = document.querySelector("#tbody")

// buttonsendplanet.addEventListener("click",function registerplanet(){

//     if (planetNameInput.value == "" || image_background.value == "" || image_icon.value || planetdescription.value){
//         message.innerText = `Falha no cadastro do Planeta!`;
//         setTimeout(clearMsgs, 1500);
//     }
//     let planet ={
//        id: 0,
//        name: planetNameInput.value,
//        icon: image_icon.value,
//        background: image_background.value,
//        description: planetdescription.value 
//     }
// }) 
//const

//criando as linhas da tabela;
// function creatLinePlanet(recipe, index){  
//     let tr2 = document.createElement("tr");
//     let td1 = document.createElement("td");
//     let td2 = document.createElement("td");
//     let td3 = document.createElement("td");
//     let td4 = document.createElement("td");
//     let td5 = document.createElement("td");
//     let td6 = document.createElement("td");
//     let td7 = document.createElement("td");

//     const editButton = document.createElement("img");
//     const deleteButton = document.createElement("img");

//     editButton.setAttribute("class", "editar-img");
//     deleteButton.setAttribute("class", "editar-img");    

//     editButton.setAttribute('onclick', `btnUpdate(${JSON.stringify(users[index])})`);
//     deleteButton.setAttribute("onclick", `delUsers(${JSON.stringify(users[index])})`);

//      editButton.setAttribute("src", "./src/lapis.png");
//      deleteButton.setAttribute("src", "./src/excluir.png");
    

//     tbody.appendChild(tr2);
//     tr2.appendChild(td1);
//     tr2.appendChild(td2);
//     tr2.appendChild(td3);
//     tr2.appendChild(td4);
//     tr2.appendChild(td5);
//     tr2.appendChild(td6);
//     tr2.appendChild(td7);


//     td1.innerHTML = planet[index].id;
//     td2.innerHTML = planet[index].name;
//     td3.innerHTML = planet[index].icon;
//     td4.innerHTML = planet[index].background;
//     td5.innerHTML = planet[index].description;
//     td6.innerHTML = editButton.outerHTML;
//     td7.innerHTML = deleteButton.outerHTML;
// }
