// // @author {João}
// //@coauthor {Carolina}

import insertHeader from "./header.js";

export default function addplanet () {
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
        </form>`
    return container
}