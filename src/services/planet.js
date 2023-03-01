// @author {Eduardo}
// @coauthor {Carolina}
const fs = require('fs');
const path = require('path');
const dbPlanet = require("../repository/db-gsquad");
const TAG = "Service: ";
const bcrypt = require("bcrypt");

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
exports.edit_SV_Planet = async (_id, name, icon, background, description, old_background, old_icon) => {
  
  try {
 
    const body = {name:name, icon:icon, background:background, description:description}
    // console.log(body);
    const editPlanet = await dbPlanet.edit_RP_Planet(_id, body);
    console.log("old_icon: ", old_icon)
    console.log("old_icon teste: ", old_icon!==undefined)
    if(old_icon!==undefined){
      let new_icon = icon.replace("../", "")
      let oldPath = path.join(__dirname, old_icon);
      let newPath = path.join(__dirname, "../../public/"+new_icon);
      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log('Arquivo renomeado com sucesso!');
      });
  
    }
    console.log("old_back: ", old_background)
    console.log("old_back teste: ", old_background!==undefined)
    if(old_background!==undefined){
      let new_back = background.replace("../", "")
      let oldPath_back = path.join(__dirname, old_background);
      let newPath_back = path.join(__dirname, "../../public/"+new_back);
  
      fs.rename(oldPath_back, newPath_back, (err) => {
        if (err) throw err;
        console.log('Arquivo renomeado com sucesso!');
      });
    }
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
    console.log(TAG, "GET/ RecipeById")

    for (let i = 0; i < recipeRequisition[1].length; i++) { /* getting the ingredients and putting in the recipe */
      const arrayIngredientsofRow = []
      recipeRequisition[1][i].rows.map((row)=> {
        arrayIngredientsofRow.push(row.ingredient)
      })
      recipeRequisition[0][i].ingredients = arrayIngredientsofRow
    }
    for (let i = 0; i < recipeRequisition[2].length; i++) { /* getting the ingredients and putting in the recipe */
    const arrayIngredientsofRow = []
    recipeRequisition[2][i].rows.map((row)=> {
      console.log("map", row.description)
      arrayIngredientsofRow.push(row.description)
    })
    recipeRequisition[0][i].instructions = arrayIngredientsofRow
  }
    const recipe = recipeRequisition[0]
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
    const recipeReq = await dbPlanet.add_RP_Recipe(
      id_planet,
      name,
      description,
      type,
      image,
      time,
      ingredients,
      instructions)
      console.log("resposta do Banco de dados: ", recipeReq)
      const img_id =  await dbPlanet.updateIMG_RP_Recipe(recipeReq[0].id)
      // console.log("resposta do banco de DADOS 2, COM ID: ", img_id[0].rows)

   
      let oldPath = path.join(__dirname, "../../public"+recipeReq[0].image);
      let newPath = path.join(__dirname, "../../public/uploads/receita-"+recipeReq[0].id+".png");

      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log('Arquivo renomeado com sucesso!');
      });
      

    return recipeReq[0];
  } catch (err) {
    console.log(err);
    return err;
  }
};


// @author {Eduardo}
exports.edit_SV_Recipe = async (_id, id_planet, name, description, type, image, time, ingredients, instructions) => {
  try{
    const body = {
      id_planet: id_planet,
      name: name,
      description: description,
      type: type,
      image: image,
      time: time,
      ingredient: ingredients,
      instructions: instructions
    }
    let id = parseInt(_id);
    const recipe = await dbPlanet.edit_RP_Recipe(_id, body)
    if(old_image!==undefined){
      let oldPath = path.join(__dirname, "../../public/"+old_image);
      let newPath = path.join(__dirname, "../../public/"+image)
      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log('Arquivo renomeado com sucesso!');
      });
    }

    return recipe;
  }catch(erro){
    console.log(erro)
    return erro;
  }
};


// @author {Eduardo}
exports.del_SV_Recipe = async (_id) => {
  try{
    const recipe = await dbPlanet.del_RP_Recipe(_id)
    return recipe;
  }catch(error){
    console.log(error)
    return error;
  }
};

exports.post_SV_Session = async (username, password) => {
  try {
    const passDB = await dbPlanet.post_RP_Session(username)
    const result = await bcrypt.compare(password, passDB[0].password);
    console.log("result ", result)
    return result
  } catch (error) {
    return error;
  }
}
