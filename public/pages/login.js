export default function addlogin () {
    
    const root = document.getElementById('root');
    const container = document.createElement("div");
    container.innerHTML = 
    `<form class="container-login">
        <label class="up-name"  for="username">Username:</label>
        <input type="text" id="username" name="username">

        <label class="up-name" for="password">Password:</label>
        <input type="password" id="password" name="password">

        <input type="submit" id "login" value="Entrar">
    </form>`
    return container
}