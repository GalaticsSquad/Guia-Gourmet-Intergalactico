//const dbPlanet = require("../repository/DB_planet");
const service = require("../services/planet");
const fs = require('fs');
const path = require('path');

// @author {Carolina}
// @coauthor {Eduardo}

// Planetas
exports.get_CT_Planet = async (req, res) => {
  console.log("Controller: /GET");
  const response = {
    message: "",
    data: null,
    error: null,
  };
  console.log(req.body)

  try {
    const allPlanets = await service.get_SV_Planet();
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

exports.get_CT_PlanetById = async (req, res) => {
  console.log("Controller: /GET");

  const response = {
    message: "",
    data: null,
    error: null,
  };

  

  try {
    const _id = parseInt(req.params.id);
    if (isNaN(_id)) { //verificar se é valido
      console.log(TAG, "Parameter isNaN")
      response.message = 'Informe um valor válido';
      response.data = null;
      response.error = 'Informe um valor válido'
      res.status(400).json(response);
      return;
    }
    const planet = await service.get_SV_Planet_id(_id);
    if(planet.length===0){
      throw 'Error: planeta não encontrado'
    }
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

exports.add_CT_Planet = async (req, res) => {
  console.log("Controller: /POST");
  const { name, icon, background, description } = req.body;
  const response = {
    message: "",
    data: null,
    error: null,
  };
  console.log("teste body:", req.body)
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

    
    if(nameRegister.length != 0 ){
      throw "Error: já existe um planeta cadastrado com esse nome"
    }
      
    const planet = await service.add_SV_Planet(name, icon, background, description);
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
exports.edit_CT_Planet = async (req, res) => {
  console.log("Controller: /PATCH");
  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {

    let _id = parseInt(req.params.id);
    let { name, icon, background, description } = req.body;
    
    console.log("NAME: ", req.body)

    let new_icon = icon.replace("../", "")
    let oldPath = path.join(__dirname, req.body.old_icon);
    let newPath = path.join(__dirname, "../../public/"+new_icon);

    let new_back = background.replace("../", "")
    let oldPath_back = path.join(__dirname, req.body.old_background);
    let newPath_back = path.join(__dirname, "../../public/"+new_back);

    // fs.rename(oldPath, newPath, (err) => {
    //   if (err) throw err;
    //   console.log('Arquivo renomeado com sucesso!');
    // });

    // fs.rename(oldPath_back, newPath_back, (err) => {
    //   if (err) throw err;
    //   console.log('Arquivo renomeado com sucesso!');
    // });

    if( _id === 1 || _id === 2 || _id === 3 || _id === 4){
      throw 'ERROR: não é permitido alterar esse planeta'
    }
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
    if(name==="" || name===" "){
      throw "Error: nome do Planeta não é válido"
    }
  
    /* delete _body.password; */
    if (isNaN(_id)) {
      console.log(TAG, "Parameter isNaN")
      response.message = 'Informe um valor válido';
      response.data = null;
      response.error = 'Informe um valor válido'
      res.status(400).json(response);
      return;
    }
    const planet = await service.edit_SV_Planet(_id, name, icon, background, description, oldPath, newPath, newPath_back, oldPath_back);
    response.message = "Success";
    response.data = planet;
    // response.data = 'CONTROLER RESPONSE';
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = "Erro interno do Servidor";
    response.data = null;
    response.error = error;
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
    if( id === 1 || id === 2 || id === 3 || id === 4){
      throw 'ERROR: não é permitido deletar esse planeta'
    }
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
exports.get_CT_Recipes = async (req, res) => {
  console.log("Controller: /GET");
  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    const receitas = await service.get_SV_Recipe();
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
exports.get_CT_RecipeById = async (req, res) => {
  console.log("Controller: /GET");
  const response = {
    message: "",
    data: null,
    error: null,
  };
  const _id = parseInt(req.params.id);

  try {
    if (isNaN(_id)) {
      console.log(TAG, "Parameter isNaN")
      response.message = 'Informe um valor válido';
      response.data = null;
      response.error = 'Informe um valor válido'
      res.status(400).json(response);
      return;
    }
    const receita = await service.get_SV_Recipe_id(_id);
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



  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    if (_body.id !== undefined) {
      delete _body.id;
    }
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
exports.del_CT_Recipe = async (req, res) => {
  console.log("Controller: /DELETE");
  /* let _id = req.params.id; */
  

  const response = {
    message: "",
    data: null,
    error: null,
  };

  try {
    let id = parseInt(req.params.id);
    const receitas = await service.del_SV_Recipe(id);
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
