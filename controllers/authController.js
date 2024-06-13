import { encrypt, compare } from "../helpers/encrypt.js";
import generateJWT from "../jwt/jwt.js";
import User from "../models/User.js";

export const createUser = async (req, res) => {
    const { email } = req.body;
    
    try {
        let user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe con ese correo'
            });
        }
        
        user = new User(req.body);

        user.password = encrypt(user.password);

        await user.save();
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Por favor hable con el administrador'
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email }).populate('team', ['name', 'color']);
        
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario y/o contraseña no son correctos'
            });
        }

        const validPassword = compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario y/o contraseña no son correctos'
            });
        }

        const tkn = await generateJWT(user.id, user.name, user.team.id, user.team.name, user.team.color);

        res.status(201).json({
            ok: true,
            user: {
                uid: user.id,
                name: user.name,
            },
            team: {
                tid: user.team.id,
                name: user.team.name,
                color: user.team.color
            },
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

export const revalidateToken = async (req, res) => {
    const { uid, name, tid, team, color } = req;

    const tkn = await generateJWT(uid, name, tid, team, color);

    res.json({
        ok: true,
        user: {
            uid,
            name,
        },
        team: {
            tid,
            name: team,
            color
        },
        tkn
    });
};