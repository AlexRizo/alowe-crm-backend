import { cloudinaryUpload } from "../helpers/cloudinaryUpload.js";
import { Print } from "../models/index.js";

export const createPrint = async (req, res) => {
    const printReq = req.body;
    
    try {
        const newPrint = new Print(printReq);
        
        newPrint.user = req.uid;
        newPrint.team = req.tid;
        newPrint.printSize = JSON.parse(printReq.printSize);
                
        if (req.files?.file) {
            newPrint.file = await cloudinaryUpload(req.files.file)
        }

        await newPrint.save();

        res.status(200).json({ 
            ok: true,
            print: newPrint
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}