import cloudinary from "../helpers/cloudinary.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    const { socialNetworks, ...postReq } = req.body;
    
    const newPost = new Post(postReq);
    
    newPost.socialNetworks = JSON.parse(socialNetworks);
    
    try {
        newPost.user = req.uid;
        newPost.team = req.tid;
                
        if (req.files?.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.files.file.tempFilePath);
            newPost.file = secure_url;
        }

        await newPost.save();

        res.status(200).json({ 
            ok: true,
            newPost
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}