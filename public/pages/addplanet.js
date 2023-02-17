export default function addplanet () {
    
    const root = document.getElementById('root');

    root.innerHTML = ` <form class="container-addplanet">
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
        <textarea name="" id="" cols="105" rows="10"></textarea>
    </div>
    <input type="submit" class"send-planet" value="Enviar Planeta">
</form>`
}