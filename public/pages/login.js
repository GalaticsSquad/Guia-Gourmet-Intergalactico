import { insertHeader, logicHeader } from "./header.js";
import {EventCustom} from "../eventCustom.js";
import { get_planets } from "../src/fetch/planet.js";

export default async function renderLogin (){
    const dataPlanet = await get_planets()
    const login = Login();
    let root = document.getElementById('root')
    root.innerHTML = ``
    root.appendChild(login);
    logicHeader(dataPlanet, dataRecipe)
    logicLogin()
}

function Login () {
    const headerFake = insertHeader();
    const container = document.createElement("div");
    container.className = "rootContainerlogin"
    container.innerHTML = 
    `<header>${headerFake}</header>
    <form class="container-login">
        <label class="up-name"  for="username">Username:</label>
        <input type="text" id="username" name="username">

        <label class="up-name" for="password">Password:</label>
        <input type="password" id="password" name="password">

        <input type="button" id="login" value="Entrar">
    </form>`
    return container
}

function logicLogin () {
    const buttonEntry = document.querySelector("#login");

    buttonEntry.addEventListener("click", () => {
        const evento = EventCustom("/option");
        root.dispatchEvent(evento);
    });

}