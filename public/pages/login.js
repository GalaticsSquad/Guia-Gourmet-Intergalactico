import { insertHeader, logicHeader } from "./header.js";
import {EventCustom} from "../eventCustom.js";
import { get_planets } from "../src/fetch/planet.js";
import { get_recipes } from "../src/fetch/recipes.js";

export default async function renderLogin (){
    const dataPlanet = await get_planets()
    const allDataRecipe = await get_recipes()
    const login = Login();
    let root = document.getElementById('root')
    root.innerHTML = ``
    root.appendChild(login);
    logicHeader(dataPlanet.data, allDataRecipe.data)
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
        <input type="text" id="username" name="username" required>

        <label class="up-name" for="password">Password:</label>
        <input type="password" id="password" name="password" required>

        <p class="textErrorLogin"></p>

        <input type="button" id="login" value="Entrar">
    </form>`
    return container
}

function logicLogin () {
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')
    const buttonEntry = document.querySelector("#login");
    const textErrorLogin = document.querySelector('.textErrorLogin')
    const root = document.querySelector('#root')
    root.style.cursor = 'auto';

    buttonEntry.addEventListener("click", async () => {
        try {
            if(username.value === ""){
                throw 'Digite um login'
            }
            if(password.value === ""){
                throw 'Digite uma senha'
            }
            const body = {username: username.value, password: password.value}
            let req =  await fetch(`http:///140.82.28.22:3000/session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            })
            let json = await req.json()
            if (json.error !== null) {
                throw json.error
            }
            else{
                root.style.cursor = 'wait';
                buttonEntry.disabled = true
                const evento = EventCustom("/option");
                root.dispatchEvent(evento);
            }
            
        } catch (error) {
            textErrorLogin.innerHTML = error
            textErrorLogin.style.color = 'red'
            setTimeout(() => {
                textErrorLogin.innerHTML = ''
            }, 4000);
        }
    });

}