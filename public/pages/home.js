import insertHeader from "./header.js";

// // @author {Carolina}
// //@coauthor {João}
export default function (data) {
    const headerFake = insertHeader();

    const container = document.createElement("div");
    
    
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

        </main>

        <footer></footer>
        `;
  
    //   carrosel();
  
    // insertHeader()
    return container;

}

// export default {renderHome}