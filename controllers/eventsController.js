import Evento from '../models/Evento.js';

export const getEventos = async (req, res) => {
    const eventos = await Evento.find().populate('user', 'name');
    
    res.status(200).json({
        ok: true,
        eventos
    });
};

export const createEvento = async (req, res) => {
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoRes = await evento.save();

        res.status(200).json({ 
            opk: true,
            eventoRes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}

export const updateEvento = async (req, res) => {
    const eventId = req.params.id;
    
    try {
        const evento = await Evento.findById(eventId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                message: 'Evento no encontrado con ese id'
            });
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                message: 'No tiene privilegios para editar este evento'
            });
        }

        const newEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventId, newEvento, { new: true });

        res.status(200).json({
            ok: true,
            eventoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}

export const deleteEvento = async (req, res) => {
    const eventId = req.params.id;
    
    try {
        const evento = await Evento.findById(eventId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                message: 'Evento no encontrado con ese id'
            });
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                message: 'No tiene privilegios para eliminar este evento'
            });
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventId);

        res.status(200).json({
            ok: true,
            eventoEliminado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}