import Route from "./routes.js";

const root = document.querySelector("#root");

root.addEventListener("onstatechange", function (event) {
  const url = event.detail.url;
  const idPlanet = event.detail.dataPlanet
  const idRecipe = event.detail.dataRecipe
  window.history.pushState("", "", url);

  Route(url,idPlanet, idRecipe)
  const customEvent = new Event("popstate")
  window.dispatchEvent(customEvent);
});

window.addEventListener("load", () => {
  Route('/')
});
