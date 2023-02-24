//const dbPlanet = require("../repository/DB_planet");
const service = require("../services/planet");

// @author {Carolina}
// @coauthor {Eduardo}

// Planetas
exports.getPlanet = async (req, res) => {
  console.log("Controller: /GET");
  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    const allPlanets = await service.getPlanet();
    response.message = "Success";
    response.data = allPlanets;
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = "Erro interno do Servidor";

    res.status(500).json(response);
  }
};

exports.getPlanetById = async (req, res) => {
  console.log("Controller: /GET");

  const response = {
    message: "",
    data: null,
    error: null,
  };

  const _id = parseInt(req.params.id);
  if (isNaN(_id)) { //verificar se é valido
    console.log(TAG, "Parameter isNaN")
    response.message = 'Informe um valor válido';
    response.data = null;
    response.error = 'Informe um valor válido'
    res.status(400).json(response);
    return;
  }
  try {
    const planet = await service.get_Planet_id(_id);
    response.message = "Success";
    response.data = planet;
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = error;
    res.status(500).json(response);
  }
};

// @author {Eduardo}

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
    // const name2 = name.replace(/ /g, "")
    // const name2 = name.replace(/ /i, "")
    const nameRegister = await service.get_SV_planet_name(name)
    console.log("aqui:",nameRegister)
    
    if(nameRegister.length != 0 ){
      throw "Error: já existe um planeta cadastrado com esse nome"
    }
      
    const planet = await service.add_Planet(name, icon, background, description);
    response.message = "Sucess";
    response.data = planet;
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = error;
    res.status(500).json(response);
  }
};

// @author {Eduardo}
exports.editPlanet = async (req, res) => {
  console.log("Controller: /PATCH");
  const response = {
    message: "",
    data: null,
    error: null,
  };

  const _id = parseInt(req.params.id);
  const _body = req.body;
  /* delete _body.password; */
  if (isNaN(_id)) {
    console.log(TAG, "Parameter isNaN")
    response.message = 'Informe um valor válido';
    response.data = null;
    response.error = 'Informe um valor válido'
    res.status(400).json(response);
    return;
  }

  try {
    const planet = await service.edit_SV_Planet(_id, _body);
    response.message = "Success";
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

// @author {Carolina}
exports.del_CT_Planet = async (req, res) => {
  console.log("Controller: /DELETE");
  let id = parseInt(req.params.id);

  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    const planet = await service.del_SV_Planet(id);
    response.message = "Success";
    response.data = planet;
    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = error;

    res.status(500).json(response);
  }
};

// @author {Eduardo}
// Receitas
exports.getRecipes = async (req, res) => {
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

// @author {Eduardo}
exports.getRecipeById = async (req, res) => {
  console.log("Controller: /GET");
  const response = {
    message: "",
    data: null,
    error: null,
  };
  const _id = parseInt(req.params.id);
  if (isNaN(_id)) {
    console.log(TAG, "Parameter isNaN")
    response.message = 'Informe um valor válido';
    response.data = null;
    response.error = 'Informe um valor válido'
    res.status(400).json(response);
    return;
  }
  try {
    const receita = await service.get_Recipe_id(_id);
    response.message = "Success";
    response.data = receita;
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = error;
    res.status(500).json(response);
  }
};

// @author {Eduardo}
// @coauthor {Henrique}
exports.add_CT_Recipe = async (req, res) => {
  console.log("Controller: /POST");
  console.log(TAG, req.body)
  const { id_planet,
          name,
          description,
          type,
          image,
          time,
          ingredients,
          instructions} = req.body;
  const response = {
    message: "",
    data: null,
    error: null,
  };

  console.log(id_planet,
    name,
    description,
    type,
    image,
    time,
    ingredients,
    instructions)


    console.log("CONTROLER Ingredient:", ingredients)
  try {
    if (!id_planet) {
      throw "Error: Favor inserir o id do planeta!";
    }
    if (!name) {
      throw "Error: Favor inserir o nome da receita!";
    }
    if (!description) {
      throw "Error: Favor inserir a descrição da receita!";
    }
    if (!type) {
      throw "Error: Favor inserir o tipo da receita!";
    }
    if (!image) {
      throw "Error: Favor inserir o tempo de preparo da receita!";
    }
    if (!time) {
      throw "Error: Favor inserir as time de preparo da receita!";
    }
    if (ingredients == "") {
      throw "Error: Favor inserir a ingredients da receita!";
    }
    if (instructions == "") {
      throw "Error: Favor inserir a INstructions da receita!";
    }
    let recipe = await service.add_SV_Recipe(
      id_planet,
      name,
      description,
      type,
      image,
      time,
      ingredients,
      instructions);
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

// @author {Eduardo}
exports.edit_CT_Recipe = async (req, res) => {
  console.log("Controller: /PATCH");
  let _id = req.params.id;
  let _body = req.body;
  // delete _body.password;

  if (_body.id !== undefined) {
    delete _body.id;
  }

  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    const recipe = await service.edit_SV_Recipe(_id, _body);
    response.message = "Success";
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

// @author {Eduardo}
exports.delRecipe = async (req, res) => {
  console.log("Controller: /DELETE");
  /* let _id = req.params.id; */
  let id = parseInt(req.params.id);

  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    const receitas = await service.del_Recipe(id);
    response.message = "Success";
    response.data = receitas;
    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = error;

    res.status(500).json(response);
  }
};
