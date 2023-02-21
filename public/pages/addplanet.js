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
                <input type="file" class="input-addplanet" name="username">
            </div>
            <div class="back-img">
                <label class="label-back-img" for="img do icone">Imagem do icone:</label>
                <input type="file" class="input-addplanet" name="username">
            </div>
            <div id="description">
                <label class="name-label" for="Descrição">Descrição do Planeta:</label>
                <textarea name="" id="" cols="100" rows="10"></textarea>
            </div>
            <input type="submit" class="send-planet" value="Enviar Planeta">
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

// function registerplanet(){
//         registerBtn.disabled = true;
        
//         if (nameInput.value == "" || emailInput.value == ""){
//             message.innerText = `Falha no cadastro do usuário!\n Você precisa preencher o nome e a descrição do usuário!`;
//             setTimeout(clearMsgs, 1500);
//         }
//         let planet ={
//            id: 0,
//            name: "Arcano",
//            icon: "/img/planet/p1.png",
//            background: "../img/background/arcanoback.jpg",
//            description: "alguma coisa" 
//         }
// }
