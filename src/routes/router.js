const express = require("express");
const controller = require("../controllers/planet");
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../../src/multer')
const middle = require('./middlewares')
const upload = multer()

// @author {Carolina}
// @coauthor {Eduardo}
// Rotas dos planetas:
router.get("/getplanet", controller.get_CT_Planet);
router.get("/getplanet/:id" ,controller.get_CT_PlanetById);
router.post("/addplanet", middle.authenticate,  multer(multerConfig).array('file'), controller.add_CT_Planet);
router.patch("/editplanet/:id", middle.authenticate, multer(multerConfig).array('file'), controller.edit_CT_Planet);
router.delete("/delplanet/:id", middle.authenticate, controller.del_CT_Planet)

// @author {Carolina}
router.post("/session", controller.post_CT_Session)

// @author {Eduardo}
// @coauthor {Carolina}
// Rotas das receitas:
router.get("/getrecipe", controller.get_CT_Recipes);
router.get("/getrecipe/:id", controller.get_CT_RecipeById);
router.post("/addrecipe", middle.authenticate, multer(multerConfig).single('file'), controller.add_CT_Recipe);
router.patch("/editrecipe/:id", middle.authenticate, multer(multerConfig).single('file'),controller.edit_CT_Recipe);
router.delete("/delrecipe/:id", middle.authenticate, controller.del_CT_Recipe);

// @author {Carolina}
// @coauthor {Eduardo}
// Rotas da sessão
router.get("/logout", middle.authenticate, middle.logout)
router.get("/protected", middle.authenticate, middle.protected);




module.exports = router;
