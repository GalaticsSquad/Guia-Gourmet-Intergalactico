import EventCustom from "../eventCustom.js";

export default function insertHeader() {
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
                <a>
                    <div class="linkHome">Home</div>
                </a>
                <a>
                    <div class="link"></div>
                </a>
                <a>
                    <div class="link"></div>
                </a>
                <a>
                    <div class="link"></div>
                </a>
                <a>
                    <div class="link"></div>
                </a>
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

export function logicHeader (data) {

    const links = document.querySelectorAll('.link');
    const buttonHome = document.querySelector ('.linkHome')
    const buttonLogin = document.querySelector ('.loginMenu')

    let i = 0 // putting the names by fetch on nav
    while (links.length > i) {
        const planetName = data[i].name
        links[i].innerText = planetName
        links[i].addEventListener("click", () => {
            const evento = EventCustom(`/${planetName}`);
            root.dispatchEvent(evento);
        });
        i++
    }
    buttonHome.addEventListener("click", () => {
        const evento = EventCustom("/home");
        root.dispatchEvent(evento);
    });
    buttonLogin.addEventListener("click", () => {
        const evento = EventCustom("/login");
        root.dispatchEvent(evento);
    });

}
