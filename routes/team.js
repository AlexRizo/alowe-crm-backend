import { Router } from "express";
import validateJWT from "../jwt/validateJwt.js";
import { createTeam } from "../controllers/index.js";
import { check } from "express-validator";

const router = Router();

router.use(validateJWT);

router.post("/create", [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('color', 'El color no es válido (sólo hexadecimal).').not().isHexColor(),
], createTeam);

export default router;