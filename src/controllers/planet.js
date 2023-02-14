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
    console.log("Deu certo try controller");
    const planets = await service.getPlanet();
    response.message = "Success";
    response.data = planets;
    res.json(response);
  } catch (error) {
    console.log(error);

    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = "Erro interno do Servidor";

    res.json(response);
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
