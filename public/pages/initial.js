import EventCustom from "../eventCustom.js";
export default () => {
  const root = document.querySelector("#root");
  const backgroundInit = document.createElement("div");
  backgroundInit.setAttribute("class", "backgroundInit");
  root.appendChild(backgroundInit);

  const containerInit = document.createElement("div");
  containerInit.setAttribute("class", "containerInit");
  root.appendChild(containerInit);

  const containerLogoInit = document.createElement("div");
  containerLogoInit.setAttribute("class", "containerLogoInit");
  containerInit.appendChild(containerLogoInit);

  const containerButtonInit = document.createElement("div");
  containerButtonInit.setAttribute("class", "containerButtonInit");
  containerInit.appendChild(containerButtonInit);

  const titleInit = document.createElement("h1");
  titleInit.setAttribute("class", "titleInit");
  containerInit.appendChild(titleInit);
  titleInit.innerText = "Guia Gourmet Intergaláctico";

  const buttonInit = document.createElement("button");
  buttonInit.setAttribute("class", "button-init");
  containerButtonInit.appendChild(buttonInit);
  buttonInit.innerText = "Entrar";

  buttonInit.addEventListener("click", () => {
    const evento = EventCustom("/home");
    root.dispatchEvent(evento);
  });

  return containerInit;
};
