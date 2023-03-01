import {EventCustom} from "../eventCustom.js";

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

function logicHeader (dataPlanet, dataRecipe) {
    const buttonLogin = document.querySelector ('.loginMenu')
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
    buttonLogin.addEventListener("click", () => {
        const evento = EventCustom("/login");
        root.style.cursor = 'wait';
        root.dispatchEvent(evento);
    });

}

export {insertHeader, logicHeader}