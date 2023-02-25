const express = require("express");
const controller = require("../controllers/planet");
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../../src/multer')
const upload = multer()


const teste = require('../repository/db-gsquad.js')


/* function authenticate(req, res, next) {
  if (req.body.password !== "123") {
    res.status(403).json({ err: "proibido" });
    return;
  }
  next();
} */

// @author {Carolina}
// @coauthor {Eduardo}
// Rotas dos planetas:
router.get("/getplanet", controller.get_CT_Planet);
router.get("/getplanet/:id", controller.get_CT_PlanetById);
router.post("/addplanet", multer(multerConfig).array('file'), controller.add_CT_Planet);
router.patch("/editplanet_text/:id", controller.edit_CT_Planet);
router.patch("/editplanet/:id", multer(multerConfig).array('file'), controller.edit_CT_Planet);
router.delete("/delplanet/:id", controller.del_CT_Planet);

// @author {Eduardo}
// @coauthor {Carolina}
// Rotas das receitas:
router.get("/getrecipe", controller.get_CT_Recipes);
router.get("/getrecipe/:id", controller.get_CT_RecipeById);
router.post("/addrecipe", multer(multerConfig).single('file'), controller.add_CT_Recipe);
router.patch("/editrecipe/:id", controller.edit_CT_Recipe);
router.delete("/delrecipe/:id", controller.del_CT_Recipe);


// router.get("/name/:name", teste.get_RP_name);


// Rota para upload de imagens;
router.post("/img", multer(multerConfig).array('file'), (req, res) => {
  console.log(req.file)
  console.log(req.body)
 res.json({upload: 'OK'});
})

router.post("/img2", multer(multerConfig).single('file'), (req, res) => {
  console.log(req.file)
  console.log(req.body)
 res.json({upload: 'OK'});
})

module.exports = router;
