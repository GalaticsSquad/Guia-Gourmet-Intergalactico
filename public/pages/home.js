import insertHeader from "./header.js";

// // @author {Carolina}
// //@coauthor {João}
export function renderHome (data) {
    const headerFake = insertHeader();
    const container = document.createElement("div");
    container.className = "rootContainerHome"
    container.innerHTML = `    
        <header>${headerFake}</header>
        <main class="mainHome">

            <section class="containerSliderHome">

                <div class="slides">

                    <div class="slide active">
                        <div class="slideContainer">
                            <div class="containerPlanetName">
                                <h2 class="PlanetName">${data[0].name}</h2>
                            </div>
                            <div class="recipes">
                                <div class="containerRecipeLeft">
                                    <div class="recipeWrapper">
                                        <div class="recipePlate"></div>
                                        <div class="recipeNameContainer">
                                            <h3 class="recipeName">Recipe Left2</h3>
                                        </div>
                                        <div class="recipeInfoContainer">
                                            <ul>
                                                <li class="recipeResume">Borroca é uma fruta muito
                                                conhecida em Zephyrion,  seu 
                                                gosto amargo, faz toda diferença 
                                                ao prato, elevando a experiência.</li>
                                                <li class="recipeType">20 min de preparo</li>
                                                <li class="recipeTime">Salada</li>
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
                                        <h3 class="recipeName">Recipe Left2</h3>
                                        </div>
                                        <div class="recipeInfoContainer">
                                            <ul>
                                                <li class="recipeResume">Borroca é uma fruta muito
                                                conhecida em Zephyrion,  seu 
                                                gosto amargo, faz toda diferença 
                                                ao prato, elevando a experiência.</li>
                                                <li class="recipeType">20 min de preparo</li>
                                                <li class="recipeTime">Salada</li>
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
                    <div class="slide next">
                        <div class="slideContainer">
                            <div class="containerPlanetName">
                                <h2 class="PlanetName">${data[1].name}</h2>
                            </div>
                            <div class="recipes">
                                <div class="containerRecipeLeft">
                                    <div class="recipeWrapper">
                                        <div class="recipeNameContainer">
                                        <h3 class="recipeName">Recipe Left2</h3>
                                        </div>
                                        <div class="recipeInfoContainer">
                                            <ul>
                                                <li class="recipeResume">Borroca é uma fruta muito
                                                conhecida em Zephyrion,  seu 
                                                gosto amargo, faz toda diferença 
                                                ao prato, elevando a experiência.</li>
                                                <li class="recipeType">20 min de preparo</li>
                                                <li class="recipeTime">Salada</li>
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
                                        <h3 class="recipeName">Recipe Left2</h3>
                                        </div>
                                        <div class="recipeInfoContainer">
                                            <ul>
                                                <li class="recipeResume">Borroca é uma fruta muito
                                                conhecida em Zephyrion,  seu 
                                                gosto amargo, faz toda diferença 
                                                ao prato, elevando a experiência.</li>
                                                <li class="recipeType">20 min de preparo</li>
                                                <li class="recipeTime">Salada</li>
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
                    <div class="slide">
                        <div class="slideContainer">
                            <div class="containerPlanetName">
                                <h2 class="PlanetName">${data[2].name}</h2>
                            </div>
                            <div class="recipes">
                                <div class="containerRecipeLeft">
                                    <div class="recipeWrapper">
                                        <div class="recipeNameContainer">
                                        <h3 class="recipeName">Recipe Left2</h3>
                                        </div>
                                        <div class="recipeInfoContainer">
                                            <ul>
                                                <li class="recipeResume">Borroca é uma fruta muito
                                                conhecida em Zephyrion,  seu 
                                                gosto amargo, faz toda diferença 
                                                ao prato, elevando a experiência.</li>
                                                <li class="recipeType">20 min de preparo</li>
                                                <li class="recipeTime">Salada</li>
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
                                        <h3 class="recipeName">Recipe Left2</h3>
                                        </div>
                                        <div class="recipeInfoContainer">
                                            <ul>
                                                <li class="recipeResume">Borroca é uma fruta muito
                                                conhecida em Zephyrion,  seu 
                                                gosto amargo, faz toda diferença 
                                                ao prato, elevando a experiência.</li>
                                                <li class="recipeType">20 min de preparo</li>
                                                <li class="recipeTime">Salada</li>
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

                    <div class="slide prev">
                        <div class="slideContainer">
                            <div class="containerPlanetName">
                                <h2 class="PlanetName">${data[3].name}</h2>
                            </div>
                            <div class="recipes">
                                <div class="containerRecipeLeft">
                                    <div class="recipeWrapper">
                                        <div class="recipeNameContainer">
                                        <h3 class="recipeName">Recipe Left2</h3>
                                        </div>
                                        <div class="recipeInfoContainer">
                                            <ul>
                                                <li class="recipeResume">Borroca é uma fruta muito
                                                conhecida em Zephyrion,  seu 
                                                gosto amargo, faz toda diferença 
                                                ao prato, elevando a experiência.</li>
                                                <li class="recipeType">20 min de preparo</li>
                                                <li class="recipeTime">Salada</li>
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
                                        <h3 class="recipeName">Recipe Left2</h3>
                                        </div>
                                        <div class="recipeInfoContainer">
                                            <ul>
                                                <li class="recipeResume">Borroca é uma fruta muito
                                                conhecida em Zephyrion,  seu 
                                                gosto amargo, faz toda diferença 
                                                ao prato, elevando a experiência.</li>
                                                <li class="recipeType">20 min de preparo</li>
                                                <li class="recipeTime">Salada</li>
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
            
                </div>
            
            </section>

            <section class="containerCarroselHome">
                
                <div class="items">
                    <div class="item active">
                        <img src="../img/planet/p1.png">
                    </div>
                    <div class=" item next">
                        <img src="../img/planet/p2.png">
                    </div>
                    <div class="item">
                        <img src="../img/planet/p3.png">
                    </div>
                    <div class="item prev">
                        <img src="../img/planet/p4.png">
                    </div>
                    <div class="button-container">
                        <div class="buttonCarrossel"><i class="fas fa-angle-left"></i></div>
                        <div class="buttonCarrossel"><i class="fas fa-angle-right"></i></div>
                    </div>
                </div>
        
            </section>
            <footer> <a href="https://github.com/GalaticsSquad/Guia-Gourmet-Intergalactico" class="textFooter">Copyright 2023 GalaticSquad - Carolina Liberato, Henrique Saiti, Eduardo Henrique, João Silva </a> </footer>
        </main>
        `;
    return container;
}

// @author {Carolina}

export function logicHome() {

    /* CARROSEL */

    console.log('carrosel')
    const items = document.querySelectorAll(".item");
    const button = document.querySelectorAll(".buttonCarrossel");
    const slides = document.querySelectorAll(".slide");

    console.log("items length:", items.length);
    console.log(slides.length);

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