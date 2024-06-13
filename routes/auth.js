import { Router } from "express";
import { check } from "express-validator";
import { createUser, login, revalidateToken } from "../controllers/index.js";
import { expressValidator } from "../middlewares/expressValidator.js";
import validateJWT from "../jwt/validateJwt.js";

const router = Router();

router.post('/register', [
    check('name', ' - El nombre es obligatorio').not().isEmpty(),
    check('email', '- El email debe ser válido').isEmail(),
    check('password', '- La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    expressValidator
], createUser);

router.post('/login', [
    check('email', '- El email no es válido').isEmail(),
    // check('password', '- La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    expressValidator
], login);

router.get('/renew', validateJWT, revalidateToken);

export default router;