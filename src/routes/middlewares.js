const jwtLib = require("jsonwebtoken");
// @author {Carolina}
exports.authenticate = async (req, res, next) => {
    try {
        const decodedJwt = jwtLib.verify(req.cookies.session, process.env.JWTSECRET);
        req.user = decodedJwt.user
        return next();
    } catch (error) {
        const response = {
            message: "",
            data: null,
            error: null,
        };
        console.log("Middleware", error);
        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = error;
        res.status(403).json(response);
    }
}
exports.protected = (req, res) => {
    return res.json({ user: req.user });
};


exports.logout =  (req, res) => {
    return res
      .clearCookie('session')
      .status(200)
      .json({
        message: "Successfully logged out",
        data: null,
        error: null });
  };
