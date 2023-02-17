const express = require("express");
const controller = require("../controllers/planet");
const router = express.Router();


function authenticate(req, res, next) {
  if (req.body.password !== 123) {
    res.status(403).json({ err: "proibido" });
    return;
  }
  next();
}

// @author {Carolina}
// @coauthor {Eduardo}

// Rotas dos planetas:
router.get("/getplanet", controller.getPlanetById);
router.post("/planet", authenticate, controller.addPlanet);
router.patch("/planet/:id", authenticate, controller.editPlanet);

// @author {Eduardo}
// @coauthor {Carolina}
// Rotas das receitas:
router.get("/getrecipe", controller.getRecipes);
router.get("/getrecipe/:id", controller.getRecipeById);
router.post("/recipe", authenticate, controller.addRecipe);
router.patch("/recipe/:id", authenticate, controller.editRecipe);
router.delete("/recipe/:id", authenticate, controller.delRecipe);

module.exports = router;
