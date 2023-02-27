const jwtLib = require("jsonwebtoken");
// @author {Carolina}
exports.authenticate = async (req, res, next) => {
    try {
        console.log('authenticate')
        console.log("cokies", req.cookies.session)
        const decodedJwt = jwtLib.verify(req.cookies.session, process.env.JWTSECRET); // process.env.JWTSECRET
        console.log(decodedJwt);
        next();

        // throw 'Erro na autenticação.'
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