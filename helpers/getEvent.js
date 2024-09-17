import mongoose from "mongoose";

const collections = ['events', 'digitals', 'others', 'posts', 'prints', 'tshirts'];

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
        console.log({task, type, id});
        if (task) return task;
    }
};