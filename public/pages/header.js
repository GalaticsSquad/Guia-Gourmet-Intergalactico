
export default function insertMenu () {
    const header = document.querySelector('header')
    header.innerHTML = 
    `
    <div id="menu"> 
        <input type="checkbox" id="check" /> 

        <div class="containerNameHeader">
            <h1 class="nameHeader">Guia Gourmet Intergaláctico</h1>
        </div>

        <label for="check" id="icone">
            <img class="imgMenu" src="./images/icone_bar.png"/>
        </label>

        <div class="barra">
            <nav>
                <a href="">
                    <div class="link">Home</div>
                </a>
                <a href="">
                    <div class="link">Arcano</div>
                </a>
                <a href="">
                    <div class="link">Hyperion</div>
                </a>
                <a href="">
                    <div class="link">Silfrena</div>
                </a>
                <a href="">
                    <div class="link">Zephyrion</div>
                </a>
            </nav>
            <div class="containerLoginMenu">
                <a href="" class="loginMenu">Login</a>
            </div>
        </div>
    </div>

    <div class="containerLogoHeader"></div>   

    `
}