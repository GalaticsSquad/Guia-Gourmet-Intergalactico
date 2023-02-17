// export default () => {
const root = document.querySelector("#root");
root.innerHTML = `
    <div class="container_planet_recipe">
        <form class="form_envio">
            <div class="div_input">
                <label>Nome do Planeta</label>
                <div>
                    <select>
                        <option>planet 1</option>
                        <option>planet 2</option>
                        <option>planet 3</option>
                        <option>planet 4</option>
                    </select>
                </div>
            </div>
            <div class="div_input">
                <label>Imagem da receita:</label>
                <div class="div_image">
                    <input type="text" id="input_image_receita">
                </div>
            </div>
            <div class="div_input">
                <label>Tipo da Receita:</label>
                <div>
                    <select>
                        <option>type 1</option>
                        <option>type 2</option>
                        <option>type 3</option>
                        <option>type 4</option>
                    </select>
                </div>
            </div>
            <div class="div_input">
                <label>Tempo de preparo:</label>
                <div class="div_input">
                    <input type="text" id="input_tempo">
                </div>
            </div>
            <div class="div_input">
                <label>Ingredientes:</label>
                <div class="div_input">
                    <textarea id="text_receita" cols="106" rows="5">
                    </textarea>
                </div>
            <div class="div_input">
                <label>Preparo:</label>
                <div class="div_input">
                    <textarea id="text_receita" cols="106" rows="5">
                    </textarea>
                </div>
            </div>
                <input type="button" class="envio_button" id="input_image_planeta" value="Enviar">
            </div>

        </form>
    </div>
    `;
// };
