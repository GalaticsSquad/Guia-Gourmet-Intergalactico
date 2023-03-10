import {insertHeader, logicHeader} from "./header.js";
import { EventCustom } from "../eventCustom.js";
import { get_planets } from "../src/fetch/planet.js";
import { get_recipes } from "../src/fetch/recipes.js";

//Recipe.name só pode ter 32 caracteres
//Recipe.description pode ter até 100 caracteres

// // @author {Carolina}
// //@coauthor {Eduardo}
export default async function renderHome() {
    const dataPlanet = await get_planets()
    const dataRecipe = await get_recipes()
    const home = htmlHome (dataPlanet.data, dataRecipe.data)
    const root = document.getElementById('root')
    root.innerHTML = ``
    root.appendChild(home);
    logicHome(dataRecipe.data)
    logicHeader(dataPlanet.data, dataRecipe.data)
}

// // @author {Carolina}
// //@coauthor {João}
function htmlHome (dataPlanet, dataRecipe) {
    const headerFake = insertHeader();
    const container = document.createElement("div");
    let format_data = find_recipe_planet(dataPlanet, dataRecipe)
    const dig = dataRecipe[2].name.substring(0,100)

    const add_recipe = slides_Recipe(format_data)
    const add_planet = slide_planets(format_data)

    container.className = "rootContainerHome"
    container.innerHTML = `    
        <div class="backgroundInit"></div>
        <header>${headerFake}</header>
        <main class="mainHome" >

            <section class="containerSliderHome">

                <div class="slides">
                    <div class="slide active">
                        <div class="slideContainer">
                            <div class="containerPlanetName">
                                <h2 class="PlanetName">${format_data[0].planeta.name}</h2>
                            </div>
                            <div class="recipes">
                                <div class="containerRecipeLeft">
                                    <div class="recipeWrapper">
                                        <div class="recipeNameContainer">
                                            <h3 class="recipeName">${format_data[0].receitas[0].name}</h3>
                                        </div>
                                        <div class="recipeInfoContainer">
                                            <ul class="listHome">
                                                <li class="recipeResume">${format_data[0].receitas[0].description}</li>
                                                <li class="recipeType">${format_data[0].receitas[0].type}</li>
                                                <li class="recipeTime">tempo de preparo: ${format_data[0].receitas[0].time}</li>
                                            </ul>
                                        </div>
                                        <div class="recipeButtonContainer">
                                            <button class="recipeButton">Ver mais</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="containerRecipeRight">
                                    <div class="recipeWrapper">
                                        <div class="recipeNameContainer">
                                        <h3 class="recipeName">${format_data[0].receitas[1].name}</h3>
                                        </div>
                                        <div class="recipeInfoContainer">
                                        <ul class="listHome">
                                            <li class="recipeResume">${format_data[0].receitas[1].description}</li>
                                            <li class="recipeType">${format_data[0].receitas[1].type}</li>
                                            <li class="recipeTime">tempo de preparo: ${format_data[0].receitas[1].time}</li>
                                        </ul>
                                        </div>
                                        <div class="recipeButtonContainer">
                                            <button class="recipeButton">Ver mais</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    
                    ${add_recipe}
                    
            
                </div>
            
            </section>

            <section class="containerCarroselHome">
                
                <div class="items">
                    <div class="item active">
                        <img src="${format_data[0].planeta.icon}">
                    </div>
                    ${add_planet}

                    <div class="button-container">
                        <div class="buttonCarrossel"><i class="fas fa-angle-left"></i></div>
                        <div class="buttonCarrossel"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
        
            </section>
            <footer> <a href="https://github.com/GalaticsSquad/Guia-Gourmet-Intergalactico" class="textFooter">Copyright 2023 GalaticSquad - Carolina Liberato, Henrique Saiti, Eduardo Henrique, João Victor</a> </footer>
        </main>
        `;
    
    return container;
}

// @author {Carolina}
function logicHome(dataRecipe) {
    const root = document.querySelector('#root');
    root.style.cursor = 'auto'
    const recipeButton = document.querySelectorAll('.recipeButton')
    const slideContainer = document.querySelector('.slideContainer')
    let i = 0
    recipeButton.forEach(button => {
        button.addEventListener('click', (event) => {
            const recipeName = event.target.parentElement.parentElement.children[0].children[0].innerHTML
            const receita = dataRecipe.find(recipe => recipe.name == recipeName)
            root.style.cursor = 'wait'
            slideContainer.style.cursor = 'wait'
            button.disabled = true
            const evento = EventCustom(`/planets`, receita.id_planet, receita.id) ;
            root.dispatchEvent(evento);
        })
    });

    /* CARROSEL */

    const items = document.querySelectorAll(".item");
    const button = document.querySelectorAll(".buttonCarrossel");
    const slides = document.querySelectorAll(".slide");

    let current = 0;
    let prev = items.length - 1;
    let next = 1;

    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", () =>
        i == 0 ? gotoPrev() : gotoNext()
        );
    }

    const gotoPrev = () =>
        current > 0 ? gotoNum(current - 1) : gotoNum(items.length - 1);

    const gotoNext = () =>
        current < items.length - 1 ? gotoNum(current + 1) : gotoNum(0);

    const gotoNum = (number) => {
        current = number;
        prev = current - 1;
        next = current + 1;

        for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
        items[i].classList.remove("prev");
        items[i].classList.remove("next");
        }

        for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        slides[i].classList.remove("prev");
        slides[i].classList.remove("next");
        }

        if (next == items.length) {
        next = 0;
        }

        if (prev == -1) {
        prev = items.length - 1;
        }

        items[current].classList.add("active");
        items[prev].classList.add("prev");
        items[next].classList.add("next");

        slides[current].classList.add("active");
        slides[prev].classList.add("prev");
        slides[next].classList.add("next");
    };
}

// @author {Eduardo}
function find_recipe_planet(data,dataR){
    let vetor = []
    for(let i=0;i<data.length;i++){
        let find = dataR.filter(receita => receita.id_planet===data[i].id)
        if(find.length===0){
            let formatado={planeta:data[i],receitas: null}
            vetor.push(formatado)
            continue
        }
        let formatado = {planeta:data[i],receitas:find}
        vetor.push(formatado)
    }
    return vetor
}

// @author {Eduardo}
function slides_Recipe(data){
    let slidesReceita = ``

    let slides = ['slide next','slide','slide prev']
    
    if(data.length<2){
        return;
    }
    let new_array = []
    for(let i=0;i<data.length;i++){
        if(data[i].receitas===null || data[i].receitas.length < 2){
            continue
        }
        new_array.push(data[i])
    }
    for(let i=1; i<new_array.length;i++){
        
        let slideAux = ``
        const limite = new_array.length -1
        if(i===limite){slideAux = slides[2]}else if(i-1>=1){slideAux = slides[1]}else{slideAux = slides[i-1]}

        slidesReceita = slidesReceita+ `
                    <div class="${slideAux}">
                        <div class="slideContainer">
                            <div class="containerPlanetName">
                                <h2 class="PlanetName">${new_array[i].planeta.name}</h2>
                            </div>
                            <div class="recipes">
                                <div class="containerRecipeLeft">
                                    <div class="recipeWrapper">
                                        <div class="recipeNameContainer">
                                        
                                        <h3 class="recipeName">${new_array[i].receitas[0].name}</h3>
                                        </div>
                                        <div class="recipeInfoContainer">
                                            <ul class="listHome">
                                                <li class="recipeResume">${new_array[i].receitas[0].description}</li>
                                                <li class="recipeType">${new_array[i].receitas[0].type}</li>
                                                <li class="recipeTime">tempo de preparo: ${new_array[i].receitas[0].time}</li>
                                            </ul>
                                        </div>
                                        <div class="recipeButtonContainer">
                                            <button class="recipeButton">Ver mais</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="containerRecipeRight">
                                    <div class="recipeWrapper">
                                        <div class="recipeNameContainer">
                                        <h3 class="recipeName">${new_array[i].receitas[1].name}</h3>
                                        </div>
                                        <div class="recipeInfoContainer">
                                            <ul class="listHome">
                                                <li class="recipeResume">${new_array[i].receitas[1].description}</li>
                                                <li class="recipeType">${new_array[i].receitas[1].type}</li>
                                                <li class="recipeTime">tempo de preparo: ${new_array[i].receitas[1].time}</li>
                                            </ul>
                                        </div>
                                        <div class="recipeButtonContainer">
                                            <button class="recipeButton">Ver mais</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
    }
    return slidesReceita;
}

// @author {Eduardo}
function slide_planets (data) {
    let slidePlanetas = ``
    if(data.length<2){
        return;
    }
    
    let slides = ['item next','item','item prev']
    let new_array = []
    for(let i=0;i<data.length;i++){
        if(data[i].receitas===null || data[i].receitas.length < 2){
            continue
        }
        new_array.push(data[i])
    }

    for(let i=1;i<new_array.length;i++){
        let slideAux = ``

        const limite = new_array.length -1

        if(i==limite){slideAux = slides[2]}else if(i-1>=1){slideAux = slides[1]}else{slideAux = slides[i-1]}
        slidePlanetas = slidePlanetas+`
            <div class="${slideAux}" >
                <img src=${new_array[i].planeta.icon}>
            </div>`
    }
    return slidePlanetas;
}
