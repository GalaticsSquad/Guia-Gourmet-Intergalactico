import insertHeader from './header.js'

// @author {Carolina}
//@coauthor {João}

export default function renderHome () {
    
    const root = document.getElementById('root');

    root.innerHTML = 
    `    
    <header></header>

    <main class="mainHome">

        <section class="containerSliderHome">

            <div class="slides">

                <div class="slide active">
                    <div class="slideContainer">
                        <div class="containerPlanetName">
                            <h2 class="PlanetName">Planeta1</h2>
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
                            <h2 class="PlanetName">Planeta2</h2>
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
                            <h2 class="PlanetName">Planeta3</h2>
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
                            <h2 class="PlanetName">Planeta4</h2>
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
                    <img src="images/p1.png">
                </div>
                <div class=" item next">
                    <img src="images/p2.png">
                </div>
                <div class="item">
                    <img src="images/p4.png">
                </div>
                <div class="item prev">
                    <img src="images/p3.png">
                </div>
                <div class="button-container">
                    <div class="button"><i class="fas fa-angle-left"></i></div>
                    <div class="button"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
    
        </section>

    </main>

    <footer></footer>

    `
    insertHeader()

};

{/* <div id="recipes">
                <div class="item active">
                    <div class="frame-content">
                        <h2>Slide 1</h2>
                    </div>
                </div>
                <div class=" item next">
                    <div class="frame-content">
                        <h2>Slide 2</h2>
                    </div>
                </div>
                <div class=" item">
                    <div class="frame-content">
                        <h2>Slide 3</h2>
                    </div>
                </div>
                <div class="item prev">
                    <div class="frame-content">
                        <h2>Slide 4</h2>
                    </div>
                </div>
            </div> */}