import insertHeader from "./header.js";

export default function addlogin (data) {
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

        <input type="submit" id="login" value="Entrar">
    </form>`
    return container
}