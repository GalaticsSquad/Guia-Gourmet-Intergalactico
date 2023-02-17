import EventCustom from "../eventCustom.js"
export default () => {
  const root = document.querySelector("#root");
  const container = document.createElement("div");
  const background = document.createElement("div");
  const containerLogo = document.createElement("div");
  const containerButton = document.createElement("div");
  //const title = document.createElement("h1");
  const button = document.createElement("button");

  root.appendChild(background);
  root.appendChild(container);
  container.appendChild(containerLogo);
  container.appendChild(containerButton);
  //containerLogo.appendChild(title);
  containerButton.appendChild(button);

  background.setAttribute("class", "background-init");
  container.setAttribute("class", "main-init");
  containerLogo.setAttribute("class", "container-logo-init");
  containerButton.setAttribute("class", "container-button-init");
  //title.setAttribute("class", "title-init");
  button.setAttribute("class", "button-init");

  button.addEventListener('click', ()=>{
    console.log('/planets')
    const evento = EventCustom('/planets')
    root.dispatchEvent(evento) 
  })

  //title.textContent = "Guia Gourmet Intergaláctico";
  button.textContent = "Entrar";

  return container;
};
