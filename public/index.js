// import routes from "./routes.js";
// import initial from "./pages/initial.js";
// // import home from "./pages/home.js";
// // import add_P_R from "./pages/add_planet_recipe.js";
// // import envio_p_r from "./pages/envio_planet_receita.js";

import Route from "./routes.js";

const root = document.querySelector("#root");

root.addEventListener("onstatechange", function (event) {
  // root.innerHTML = ``;
  const url = event.detail.url;
  window.history.pushState("", "", url);
  Route()
  window.dispatchEvent(new Event("popstate"));
});

window.addEventListener("load", () => {
  Route()
});


