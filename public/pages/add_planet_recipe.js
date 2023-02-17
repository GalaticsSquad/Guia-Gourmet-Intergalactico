// @author {Eduardo}

export default () =>{

    const root = document.querySelector("#root");
    root.innerHTML = `
    <div class="container_planet_recipe">
        <div class="cadastro_planet_recipe">
            <div class="buttons_planet_recipe">

                <input type="button" class="button_p_r" id="buttonP" value="Planeta">

                <input type="button" class="button_p_r" id="buttonR" value="Receita">

            </div>
        </div>
    </div>
    `
}