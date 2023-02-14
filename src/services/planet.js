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
  const recipes = dbPlanet.recipe;
  console.log(recipes); //Vê o que tem
  return recipes; //repository
};
