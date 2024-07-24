import cloudinary from "../helpers/cloudinary.js";
import { Print } from "../models/index.js";

export const createDesign = async (req, res) => {
    const printReq = req.body;
    
    const newPrint = new Print(printReq);

    try {
        newPrint.user = req.uid;
        newPrint.team = req.tid;
        newPrint.printSize = JSON.parse(printReq.printSize);
                
        if (req.files?.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.files.file.tempFilePath);
            newPrint.file = secure_url;
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