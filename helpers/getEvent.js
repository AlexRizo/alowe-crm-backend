import mongoose from "mongoose";

const collections = ['event', 'digital', 'other', 'post', 'print', 'tshirt'];

const getType = (type) => {
    return (
        type === 'evento' ? 'events' :
        type === 'digital' ? 'digitals' :
        type === 'playera' ? 'tshirts' :
        type === 'impresion' ? 'prints' :
        type === 'publicacion' ? 'posts' :
        type === 'otro' ? 'others' : ''
    );
};

export const getEventFunction = async (id = '', type = '') => {
    if (type) {
        const collection = mongoose.connection.db.collection(getType(type));
        return await collection.findOne({ _id: new mongoose.Types.ObjectId(id) });
    } 

    for (const collection of collections) {
        const task = await mongoose.connection.db.collection(collection).findOne({
            _id: new mongoose.Types.ObjectId(id)
        });
        if (task) return task;
    }
};