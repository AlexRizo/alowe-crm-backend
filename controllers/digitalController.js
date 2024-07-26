import { cloudinaryUpload } from "../helpers/cloudinaryUpload.js";
import { Digital } from "../models/index.js";

export const createDigital = async (req, res) => {
    const digitalReq = req.body;
    
    try {
        const newDigital = new Digital(digitalReq);

        newDigital.user = req.uid;
        newDigital.team = req.tid;
                
        if (req.files?.file) {
            newDigital.file = await cloudinaryUpload(req.files.file)
        }

        await newDigital.save();

        res.status(200).json({ 
            ok: true,
            digital: newDigital
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador',
            error
        });
    }
}