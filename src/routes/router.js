const express = require("express");
const controller = require("../controllers/planet");
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../../src/multer')
const upload = multer()


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
router.get("/getplanet", controller.getPlanet);
router.get("/getplanet/:id", controller.getPlanetById);
router.post("/addplanet", controller.addPlanet);
router.patch("/editplanet/:id", controller.editPlanet);
router.delete("/delplanet/:id", controller.del_CT_Planet);

// @author {Eduardo}
// @coauthor {Carolina}
// Rotas das receitas:
router.get("/getrecipe", controller.getRecipes);
router.get("/getrecipe/:id", controller.getRecipeById);
router.post("/addrecipe", controller.add_CT_Recipe);
router.patch("/editrecipe/:id", controller.edit_CT_Recipe);
router.delete("/delrecipe/:id", controller.delRecipe);


// Rota teste para upload de imagens;
router.post("/img", multer(multerConfig).single('file'), (req, res) => {
  console.log(req.file)
  console.log(req.body)
  return res.json({teste: 'OK'});
})

module.exports = router;
