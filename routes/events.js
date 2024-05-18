import { Router } from 'express';
import { check } from 'express-validator';
import validateJWT from '../jwt/validateJwt.js';
import { createEvento, deleteEvento, getEventos, updateEvento } from '../controllers/eventsController.js';
import { expressValidator } from '../middlewares/expressValidator.js';

const router = Router();

router.use(validateJWT);

router.get('/', getEventos);

router.post('/new', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').isDate(),
    check('end', 'Fecha de finalización es obligatoria').isDate(),
    expressValidator
], createEvento);

router.put('/update/:id', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').isDate(),
    check('end', 'Fecha de finalización es obligatoria').isDate(),
    expressValidator
], updateEvento);

router.delete('/delete/:id', [], deleteEvento);

export default router;