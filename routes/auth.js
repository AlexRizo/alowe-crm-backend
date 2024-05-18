import { Router } from "express";
import { check } from "express-validator";
import { crearUsuario, iniciarSesion, revalidarToken } from "../controllers/authController.js";
import { expressValidator } from "../middlewares/expressValidator.js";
import validateJWT from "../jwt/validateJwt.js";

const router = Router();

router.post('/new', [
    check('name', ' - El nombre es obligatorio').not().isEmpty(),
    check('email', '- El email debe ser válido').isEmail(),
    check('password', '- La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    expressValidator
], crearUsuario);

router.post('/', [
    check('email', '- El email debe ser válido').isEmail(),
    check('password', '- La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    expressValidator
], iniciarSesion);

router.get('/renew', validateJWT, revalidarToken);

export default router;