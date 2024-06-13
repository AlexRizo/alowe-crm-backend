import jwt from "jsonwebtoken";

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No se puede validar el token'
        });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = payload.uid;
        req.name = payload.name;
        req.tid = payload.tid;
        req.team = payload.team;
        req.color = payload.color;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token no válido'
        });
    }

    next();
};

export default validateJWT;