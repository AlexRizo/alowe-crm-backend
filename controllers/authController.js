import { encrypt, compare } from "../helpers/encrypt.js";
import generateJWT from "../jwt/jwt.js";
import Usuario from "../models/Usuario.js";

export const crearUsuario = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        let usuario = await Usuario.findOne({ email });
        
        if (usuario) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe con ese correo'
            });
        }
        
        usuario = new Usuario(req.body);

        // Encriptar contraseña
        usuario.password = encrypt(usuario.password);

        await usuario.save();
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Por favor hable con el administrador'
        });
    }
};

export const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const usuario = await Usuario.findOne({ email });
        
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario y/o contraseña no son correctos'
            });
        }

        // Confirmar los passwords
        const validPassword = compare(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario y/o contraseña no son correctos'
            });
        }

        const tkn = await generateJWT(usuario.id, usuario.name);
        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            tkn
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Por favor hable con el administrador'
        });
    }
};

export const revalidarToken = async (req, res) => {
    const { uid, name } = req;

    const tkn = await generateJWT(uid, name);
    
    res.json({
        ok: true,
        user: {
            uid,
            name
        },
        tkn
    });
};