import { Router } from 'express';
import { check } from 'express-validator';
import validateJWT from '../jwt/validateJwt.js';
import { getEvents, createEvent, updateEvent, deleteEvent, createPost, createDesign } from '../controllers/index.js';
import { expressValidator } from '../middlewares/expressValidator.js';
import { isDate } from '../helpers/isDate.js';
const router = Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post('/new-event-req', [
    check('title', '- El titulo es obligatorio').not().isEmpty(),
    check('title', '- El titulo debe tener al menos 50 caracteres').isLength({ max: 50 }),
    check('start').custom(isDate),
    check('end').custom(isDate),
    check('requiriments', '- Los requerimientos son obligatorios').isArray({ min: 1 }),
    check('description', '- La descripción es obligatoria').not().isEmpty(),
    check('description', '- La descripción debe tener al menos 1020 caracteres').isLength({ max: 1020 }),
    expressValidator
], createEvent);

router.post('/new-post-req', [
    check('title', '- El titulo de la publicación es obligatorio').not().isEmpty(),
    check('title', '- El titulo debe tener al menos 100 caracteres').isLength({ max: 100 }),
    check('title', '- El titulo debe tener al menos 5 caracteres').isLength({ min: 5 }),
    check('postDescription', '- La descripción de la publicación es obligatoria').not().isEmpty(),
    check('postDescription', '- La descripción de la publicación debe tener al menos 1020 caracteres').isLength({ max: 1020 }),
    check('postDate').custom(isDate),
    check('socialNetworks', '- Debes seleccionar al menos una red social').not().isEmpty(),
    check('description', '- La descripción es obligatoria').not().isEmpty(),
    check('description', '- La descripción debe tener al menos 1020 caracteres').isLength({ max: 1020 }),
    expressValidator
], createPost)

router.post('/new-design-req/print', [
    check('printType', 'El tipo de impresión es obligatorio').not().isEmpty(),
    check('printSize', 'El tamaño de impresión es obligatorio').not().isEmpty(),
    check('printContent', 'El contenido de impresión es obligatorio').not().isEmpty(),
    check('printDescription', 'La descripción de impresión es obligatoria').not().isEmpty(),
    check('printDate').custom(isDate),
    expressValidator
], createDesign);

router.put('/update/:id', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').isDate(),
    check('end', 'Fecha de finalización es obligatoria').isDate(),
    expressValidator
], updateEvent);

router.delete('/delete/:id', [], deleteEvent);

export default router;