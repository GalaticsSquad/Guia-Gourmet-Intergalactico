const dbPlanet = require("../repository/DB_planet");
const service = require("../services/planet");

// Planetas
exports.getPlanetById = async (req, res) => {
  console.log("Controller: /GET");

  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    const planets = await service.getPlanet();
    response.message = "Success";
    response.data = planets;
    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = "Erro interno do Servidor";

    res.status(500).json(response);
  }
};


exports.addPlanet = async (req, res) => {
  console.log("Controller: /POST");
  const {name, icon, background, description} = req.body
  const response = {
    message: "",
    data: null,
    error: null,
  };

  // if de teste para verificar os dados recebidos no corpo, pois os dados recebidos não estão sendo verificados.
  // se alguém quiser implementar fique avontade.
  try { 
    let planet = await service.add_Planet(name, icon, background, description)
    response.message ='Sucess'
    response.data = planet
    res.status(200).json(response)
  } catch (error) {
    console.log(error);

    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = "Erro interno do Servidor";

    res.status(500).json(response);
  }
};



// Receitas
exports.getRecipeById = async (req, res) => {
  console.log("Controller: /GET");

  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    const receitas = await service.getRecipe();
    response.message = "Success";
    response.data = receitas;
    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = "Erro interno do Servidor";

    res.status(500).json(response);
  }
};
