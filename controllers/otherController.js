import { Other } from "../models/index.js";

export const createOther = async (req, res) => {
    const otherReq = req.body;
    
    try {
        const newOther = new Other(otherReq);
        
        newOther.user = req.uid;
        newOther.team = req.tid;
                
        if (req.files?.file) {
            newOther.file = await cloudinaryUpload(req.files.file)
        }

        await newOther.save();

        res.status(200).json({ 
            ok: true,
            other: newOther
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
};