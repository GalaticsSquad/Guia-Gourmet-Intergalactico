const express = require("express");
const controller = require("../controllers/planet");
// const router = express();
const router = express.Router();

/* const userRoutes = require("./routes/users");

router.use(todoRouts);
router.use(userRouts);
 */

function authenticate(req, res, next) {
  if (req.body.password !== 123) {
    res.status(403).json({ err: "proibido" });
    return;
  }
  next();
}

console.log("router: OK");

router.get("/getplanet", controller.getPlanetById);
router.post("/planet", authenticate, controller.addPlanet);

// router.patch("/planet/:id", authenticate, controller.editPlanet);

router.get("/getrecipe", controller.getRecipeById);
router.post("/recipe", authenticate, controller.addRecipe);
router.patch("/recipe/:id", authenticate, controller.editRecipe);
router.delete("/recipe/:id", authenticate, controller.delRecipe);

module.exports = router;
