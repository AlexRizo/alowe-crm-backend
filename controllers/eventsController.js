import Event from '../models/Event.js';
import Post from '../models/Post.js';

export const getEvents = async (req, res) => {
    const { tid } = req;
    const events = await Event.find().where({ team: tid }).populate('user', 'name');
    const posts = await Post.find().where({ team: tid }).populate('user', 'name');

    console.log({events});
    
    res.status(200).json({
        ok: true,
        response: {
            posts,
            events
        }
    });
};

export const createEvent = async (req, res) => {
    const eventReq = new Event(req.body);

    try {
        eventReq.user = req.uid;
        eventReq.team = req.tid;
        
        const event = await eventReq.save();

        res.status(200).json({ 
            ok: true,
            event
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}

export const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    
    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'Evento no encontrado con ese id'
            });
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                message: 'No tiene privilegios para editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.status(200).json({
            ok: true,
            updatedEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}

export const deleteEvent = async (req, res) => {
    const eventId = req.params.id;
    
    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'Evento no encontrado con ese id'
            });
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                message: 'No tiene privilegios para eliminar este evento'
            });
        }

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            ok: true,
            deletedEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}