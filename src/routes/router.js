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
router.get("/getrecipe", controller.getRecipeById);
router.post("/planet", authenticate, controller.addPlanet);
// router.post("/:id", authenticate, controller.addRecipe);
router.patch("/planet/:id", authenticate, controller.editPlanet);
// router.patch("/:id", authenticate, controller.editRecipe);
// router.delete("/:id", authenticate, controller.delRecipe);
// router.delete("/:id", authenticate, controller.delRecipe);

module.exports = router;
