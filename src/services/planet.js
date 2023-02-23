// @author {Eduardo}
// @coauthor {Carolina}

const dbPlanet = require("../repository/db-gsquad");
const TAG = "Service: ";

//planet
exports.getPlanet = async () => {
  try {
    const allPlanets = await dbPlanet.getAllPlanets();
    return allPlanets;
    } catch (error) {
      console.log(TAG, 'error caught');
      throw error;
    }
};

exports.get_Planet_id = async (_id) =>{
  try {
    const planetById = await dbPlanet.get_Planet_id(_id);
    if(planetById.delete === true){
      throw "Error: Receita não encontrada"
    }
    return planetById
  } catch (error) {
    console.log(TAG, 'error caught');
    throw error;
  }
}
// @author {Eduardo}
exports.add_Planet = async (_name, _icon, _background, _description) => {
  try {
    const addPlanet = await dbPlanet.add_Planet(_name, _icon, _background, _description);
    return addPlanet;
  } catch (error) {
    console.log(TAG, 'error caught');
    throw error;
  }
};
// @author {Eduardo}
exports.edit_SV_Planet = async (_id, body) => {
  
  try {
    console.log(body);
    const editPlanet = await dbPlanet.edit_Planet(_id, body);
  /* Object.assign(editPlanet, body); */
  return editPlanet;
} catch (error) {
  console.log(TAG, 'error caught');
  throw error;
}
};

//Recipes
exports.getRecipe = async () => {
  try {
    const recipesReq = await dbPlanet.getAllRecipes();
    
    for(let i= 0; i<recipesReq.recipe.length;i++){
      const arrayIngredient = []
      const arrayDescription = []
      let ingred = recipesReq.ingredients.filter( ingred => ingred.id_recipes === recipesReq.recipe[i].id)
      let inst = recipesReq.instructions.filter( inst => inst.id_recipes === recipesReq.recipe[i].id)

      for(let x of ingred){
        arrayIngredient.push(x.ingredient)
      }
      recipesReq.recipe[i].ingredient = arrayIngredient
      for(let x of inst){
        arrayDescription.push(x.description)
      }
      recipesReq.recipe[i].instructions = arrayDescription
    }
    const recipe = recipesReq.recipe
    return recipe;
    } catch (error) {
      console.log(TAG, 'error caught');
      throw error;
    }
};

// @author {Eduardo}
exports.get_Recipe_id = async (_id) => {
  try {
    const recipeRequisition = await dbPlanet.get_Recipe_id(_id);
    /* getting the ingredients and putting in the recipe */
    const arrayIngredients = []
    for (let i = 0; i < recipeRequisition[1].length; i++) { // get the ingredients and push into a array
      arrayIngredients.push(recipeRequisition[1][i].ingredient)
    }
    for (let i = 0; i < recipeRequisition[0].length; i++) { // get the recipes and add the array of ingredients
      recipeRequisition[0][i].ingredients = arrayIngredients
    }
     /* getting the instructions and putting in the recipe */
    const arrayInstructions = []
    for (let i = 0; i < recipeRequisition[2].length; i++) {
      arrayInstructions.push(recipeRequisition[2][i].description)
    }
    for (let i = 0; i < recipeRequisition[0].length; i++) {
      recipeRequisition[0][i].instructions = arrayInstructions
    }
    const recipe = recipeRequisition[0]
    if(recipe.delete === true){
      throw "Error: Receita não encontrada"
    }
    return recipe
  } catch (error) {
    console.log(TAG, 'error caught');
    throw error;
  }
};
// @author {Eduardo}
exports.add_SV_Recipe = async (
  _id_planet,
  _name,
  _description,
  _type,
  _image,
  _time,
  _ingredients,
  _instructions) => {

  
  // let last_id = dbPlanet.recipe[dbPlanet.recipe.length - 1].id;
  try {
    const recipeReq = dbPlanet.add_RP_Recipe(
      _id_planet,
      _name,
      _description,
      _type,
      _image,
      _time,
      _ingredients,
      _instructions)

    return recipeReq;
  } catch (err) {
    console.log(err);
    return err;
  }
};


// @author {Eduardo}
exports.edit_SV_Recipe = async (_id, body) => {
  try{
    let id = parseInt(_id);
    const recipe = dbPlanet.edit_RP_Recipe(_id, body)
    return recipe;
  }catch(erro){
    console.log(erro)
    return erro;
  }
};


// @author {Eduardo}
exports.del_Recipe = async (_id) => {
  
  // let recipe = dbPlanet.recipe.find((recipe) => recipe.id === id);
  // if (!recipe) {
  //   throw "Error: receita não encontrada";
  // }
  // let index = dbPlanet.recipe.indexOf(recipe);
  const recipe = dbPlanet.del_RP_Recipe(_id)
  return recipe;
};
