// import routes from "./routes.js";
// import initial from "./pages/initial.js";
// // import home from "./pages/home.js";
// // import add_P_R from "./pages/add_planet_recipe.js";
// // import envio_p_r from "./pages/envio_planet_receita.js";


// initial();

import Route from "./routes.js"

const rota = Route()
console.log(rota)
const root = document.querySelector("#root")

root.addEventListener('onstatechange', function(event){
    root.innerHTML = ``
    const url =  event.detail.url
    root.appendChild(rota.getPages(url))
    window.history.pushState('','', url)
})

window.addEventListener('load', ()=>{
    root.appendChild(rota.getPages('/'))    
})

// const container = document.querySelector("#root");
