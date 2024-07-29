import { Tshirt } from "../models/index.js";

export const createTshirt = async (req, res) => {
    const tshirtReq = req.body;
    
    try {
        const newTshirt = new Tshirt(tshirtReq);
        
        newTshirt.user = req.uid;
        newTshirt.team = req.tid;
        newTshirt.inks = parseInt(tshirtReq.inks);
                
        if (req.files?.file) {
            newTshirt.file = await cloudinaryUpload(req.files.file)
        }

        await newTshirt.save();

        res.status(200).json({ 
            ok: true,
            tshirt: newTshirt
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
};