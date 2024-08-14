import { getEventFunction } from '../helpers/getEvent.js';
import { Digital, Event, Other, Post, Print, Tshirt } from '../models/index.js';

export const getEvent = async (req, res) => {
    const eventId = req.params.id;
    const { type } = req.query;

    try {
        // const event = await Event.findById(eventId).populate('user', 'name');
        const event = await getEventFunction(eventId, type);
        
        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'No se ha encontrado ningún evento :(.'
            });
        }

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
};

export const getEvents = async (req, res) => {
    const { tid } = req;

    const { start, end } = req.query;
    
    let startDate = new Date(start), 
        endDate = new Date(end);
    
    if (startDate.getTime() === endDate.getTime()) {
        startDate = new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1);
        endDate = new Date(endDate.getFullYear(), endDate.getMonth() + 2, 0);
    }

    const events = await Event.find({ team: tid, start: { $gte: startDate }, end: { $lte: endDate } }).populate('user', 'name');
    const posts = await Post.find({ team: tid, deadline: { $gte: startDate, $lte: endDate } }).populate('user', 'name');
    const prints = await Print.find({ team: tid, deadline: { $gte: startDate, $lte: endDate } }).populate('user', 'name');
    const digital = await Digital.find({ team: tid, deadline: { $gte: startDate, $lte: endDate } }).populate('user', 'name');
    const tshirts = await Tshirt.find({ team: tid, deadline: { $gte: startDate, $lte: endDate } }).populate('user', 'name');
    const others = await Other.find({ team: tid, deadline: { $gte: startDate, $lte: endDate } }).populate('user', 'name');
        
    res.status(200).json({
        ok: true,
        response: {
            posts,
            events,
            prints,
            digital,
            tshirts,
            others
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