const dbPlanet = require("../repository/DB_planet");
//planet
exports.getPlanet = async () => {
  const planets = dbPlanet.planet;
  return planets; //repository
};

exports.add_Planet = async (_name, _icon, _background, _description) =>{
  let last_id = dbPlanet.planet[dbPlanet.planet.length -1].id
  try{
    let objeto = {
      id : last_id+1,
      name: _name,
      icon: _icon,
      background: _background,
      description: _description}
    dbPlanet.planet.push(objeto)
    return objeto;
  }catch(err){
    console.log(err)
    return err;
  }
}



//Recipes
exports.getRecipe = async () => {
  let recipes = dbPlanet.recipe.filter(recipe => recipe.delete !== true)
  return recipes; //repository
};

exports.add_Recipe = async (_name, _description, _type, _time, _ingredients, _instructions, _image) =>{
  let last_id = dbPlanet.recipe[dbPlanet.recipe.length -1].id
  try{
    let objeto = {
      id : last_id+1,
      name: _name,
      description: _description,
      type: _type,
      time: _time,
      ingredients: _ingredients,
      instructions: _instructions,
      image: _image}
    dbPlanet.recipe.push(objeto)
    return objeto;
  }catch(err){
    console.log(err)
    return err;
  }
}

exports.del_Recipe = async (_id) => {
  let id = parseInt(_id)
  let recipe = dbPlanet.recipe.find( recipe => recipe.id === id)
  if(!recipe){
    throw 'Error: receita não encontrada'
  }
  let index = dbPlanet.recipe.indexOf(recipe);
  dbPlanet.recipe[index].delete = true;
  return recipe;
};
