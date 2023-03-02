import {EventCustom} from "../eventCustom.js";
// @author {Carolina}
function insertHeader() {
  // const header = document.createElement('header')
    const header = `
    <div id="menu"> 
        <input type="checkbox" id="check" /> 

        <div class="containerNameHeader">
            <h1 class="titleNameHeader">Guia Gourmet Intergaláctico</h1>
        </div>

        <label for="check" id="icone">
            <img class="imgMenu" src="img/icone_bar.png"/>
        </label>

        <div class="barra">
            <nav>
                
            </nav>
            <div class="containerLoginMenu">
                <a class="loginMenu">Login</a>
                <a class="logoutMenu">Logout</a>
            </div>
        </div>
    </div>

    <div class="containerLogoHeader">
        <h1 class="titlePlanet"></h1>
        <div class="LogoHeader"></div>  
    </div>   

    `;
    return header;
}
// @author {Carolina}
// @coauthor {Eduardo}
function logicHeader (dataPlanet, dataRecipe) {
    const buttonLogin = document.querySelector ('.loginMenu')
    const buttonLogout = document.querySelector ('.logoutMenu')
    const nav = document.querySelector('nav')
    const root = document.querySelector('#root')
    const aHome = document.createElement('a')

    nav.innerHTML = ''
    nav.appendChild(aHome)
    const linkHomeDiv = document.createElement('div')
    aHome.appendChild(linkHomeDiv)
    linkHomeDiv.setAttribute("class", "linkHome")
    linkHomeDiv.innerText = 'Home'

    linkHomeDiv.addEventListener("click", () => {
        const evento = EventCustom("/home");
        root.style.cursor = 'wait';
        root.dispatchEvent(evento);
    });
    
    let i = 0 // putting the names by fetch on nav
    while (dataPlanet.length > i) {
        const planetId = dataPlanet[i].id
        const planetName = dataPlanet[i].name
        const recipe  = dataRecipe.filter(recipe => recipe.id_planet === planetId)
        if (recipe.length >= 2) {
            const tagA = document.createElement('a');
            nav.appendChild(tagA);
            const divLink = document.createElement('div');
            tagA.appendChild(divLink);
            divLink.setAttribute('class', 'link')
            divLink.innerText = planetName
            divLink.addEventListener("click", () => {
            const evento = EventCustom(`/planets`, planetId, recipe[0].id) ;
            root.style.cursor = 'wait';
            root.dispatchEvent(evento);
        })};
        i++
    }

    protectedFetch()

    buttonLogin.addEventListener("click", () => {
        if (buttonLogin.innerText === "Login") {
            const evento = EventCustom("/login");
            root.style.cursor = 'wait';
            root.dispatchEvent(evento);
        }
        else {
            const evento = EventCustom("/option");
            root.style.cursor = 'wait';
            root.dispatchEvent(evento);
        }
    });

    buttonLogout.addEventListener('click', () => {
        logoutFetch()
    })

}

// @author {Carolina}
// @coauthor {Eduardo}
async function protectedFetch() {
    const buttonLogin = document.querySelector ('.loginMenu')
    const buttonLogout = document.querySelector ('.logoutMenu')
    try {
        const req = await fetch(`https:///140.82.28.22:443/protected`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }})
        const json = await req.json()
        if (!json.user) {
            throw "Usuário deslogado"
        }
        else{
            buttonLogin.innerText = json.user
            buttonLogout.style.display = 'block'
        }
        
    } catch (error) {
        console.log(error)
        buttonLogin.innerText = "Login"
    }
}
// @author {Eduardo}
// @coauthor {Carolina}
async function logoutFetch() {
    const buttonLogin = document.querySelector ('.loginMenu')
    const buttonLogout = document.querySelector ('.logoutMenu')
    try {
        const req =  await fetch(`https:///140.82.28.22:443/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }})
        const json = await req.json()
        if (json.message == "Successfully logged out") {
            buttonLogout.style.display = 'none'
            buttonLogin.innerText = "Login"
            const path = window.location.pathname
            if(path == '/addRecipes' || path == '/addPlanet'){
                const evento = EventCustom("/home");
                root.dispatchEvent(evento);
            }
        }
        else{
            throw "Error"
        }
    } catch (error) {
        console.log(error)
    }
}

export {insertHeader, logicHeader}