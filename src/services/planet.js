// @author {Eduardo}
// @coauthor {Carolina}

const dbPlanet = require("../repository/db-gsquad");
const TAG = "Service: ";

//planet
exports.get_SV_Planet = async () => {
  try {
    const allPlanets = await dbPlanet.get_RP_AllPlanets();
    return allPlanets;
    } catch (error) {
      console.log(TAG, 'error caught');
      throw error;
    }
};

exports.get_SV_Planet_id = async (_id) =>{
  try {
    const planetById = await dbPlanet.get_RP_Planet_id(_id);
    // if(planetById.delete === true){
    //   throw "Error: Receita não encontrada"
    // }
    return planetById
  } catch (error) {
    console.log(TAG, 'error caught');
    throw error;
  }
}
// @author {Eduardo}
exports.add_SV_Planet = async (_name, _icon, _background, _description) => {
  try {
    const addPlanet = await dbPlanet.add_RP_Planet(_name, _icon, _background, _description);
    return addPlanet;
  } catch (error) {
    console.log(TAG, 'error caught');
    throw error;
  }
};
// @author {Eduardo}
exports.edit_SV_Planet = async (_id, name, icon, background, description) => {
  
  try {
    const body = {name:name, icon:icon, background:background, description:description}
    // console.log(body);
    const editPlanet = await dbPlanet.edit_RP_Planet(_id, body);
  /* Object.assign(editPlanet, body); */
  return editPlanet;
} catch (error) {
  console.log(TAG, 'error caught');
  throw error;
}
};

exports.del_SV_Planet = async (_id) => {
  try{
    const planet = dbPlanet.del_RP_Planet(_id)
    return planet;
  }catch(erro){
    console.log(erro)
    return erro;
  }
};

exports.get_SV_planet_name = (name) =>{
  try {
    const name_planet = dbPlanet.get_RP_name(name)
    return name_planet;
  } catch (error) {
    console.log(error)
    return error;
  }
}

//Recipes
exports.get_SV_Recipe = async () => {
  try {
    const recipesReq = await dbPlanet.get_RP_AllRecipes();
    
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
exports.get_SV_Recipe_id = async (_id) => {
  try {
    const recipeRequisition = await dbPlanet.get_RP_Recipe_id(_id);
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
  id_planet,
  name,
  description,
  type,
  image,
  time,
  ingredients,
  instructions) => {
    // console.log("Service: /POST");
    // console.log("Service:", id_planet,
    //   name,
    //   description,
    //   type,
    //   image,
    //   time,
    //   ingredients,
    //   instructions)
  
  // let last_id = dbPlanet.recipe[dbPlanet.recipe.length - 1].id;
  try {
    const recipeReq = dbPlanet.add_RP_Recipe(
      id_planet,
      name,
      description,
      type,
      image,
      time,
      ingredients,
      instructions)

    return recipeReq;
  } catch (err) {
    console.log(err);
    return err;
  }
};


// @author {Eduardo}
exports.edit_SV_Recipe = async (_id, body) => {
  try{
    // let id = parseInt(_id);
    const recipe = dbPlanet.edit_RP_Recipe(_id, body)
    return recipe;
  }catch(erro){
    console.log(erro)
    return erro;
  }
};


// @author {Eduardo}
exports.del_SV_Recipe = async (_id) => {
  try{
    const recipe = dbPlanet.del_RP_Recipe(_id)
    return recipe;
  }catch(erro){
    console.log(erro)
    return erro;
  }
};
