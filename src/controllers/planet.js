//const dbPlanet = require("../repository/DB_planet");
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
  const { name, icon, background, description } = req.body;
  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    if (!name) {
      throw "Error: Por favor insira o nome do planeta.";
    }
    if (!icon) {
      throw "Error: Por favor insira o icone do planeta.";
    }
    if (!background) {
      throw "Error: Por favor insira o background do planeta.";
    }
    if (!description) {
      throw "Error: Por favor insira a descrição do planeta.";
    }

    let planet = await service.add_Planet(name, icon, background, description);
    response.message = "Sucess";
    response.data = planet;
    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = "Erro interno do Servidor";

    res.status(500).json(response);
  }
};

exports.editPlanet = async (req, res) => {
  console.log("Controller: /PATCH");
  let _id = req.params.id;
  let _body = req.body;
  delete _body.password;

  if (_body.id !== undefined) {
    delete _body.id;
  }

  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    const receitas = await service.edit_Planet(_id, _body);
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

exports.addRecipe = async (req, res) => {
  console.log("Controller: /POST");
  const { name, description, type, time, ingredients, instructions, image } =
    req.body;
  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    if (!name) {
      throw "Error: Favor inserir o nome da receita!";
    }
    if (!description) {
      throw "Error: Favor inserir a descrição da receita!";
    }
    if (!type) {
      throw "Error: Favor inserir o tipo da receita!";
    }
    if (!time) {
      throw "Error: Favor inserir o tempo de preparo da receita!";
    }
    if (!ingredients) {
      throw "Error: Favor inserir as instruções de preparo da receita!";
    }
    if (!instructions) {
      throw "Error: Favor inserir a descrição da receita!";
    }
    if (!image) {
      throw "Error: Favor inserir a imagem da receita!";
    }
    let recipe = await service.add_Recipe(
      name,
      description,
      type,
      time,
      ingredients,
      instructions,
      image
    );
    response.message = "Sucess";
    response.data = recipe;
    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = error;

    res.status(500).json(response);
  }
};

exports.editRecipe = async (req, res) => {
  console.log("Controller: /PATCH");
  let _id = req.params.id;
  let _body = req.body;
  delete _body.password;

  if (_body.id !== undefined) {
    delete _body.id;
  }

  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    const receitas = await service.edit_Recipe(_id, _body);
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

exports.delRecipe = async (req, res) => {
  console.log("Controller: /DELETE");
  let _id = req.params.id;

  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    const receitas = await service.del_Recipe(_id);
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
