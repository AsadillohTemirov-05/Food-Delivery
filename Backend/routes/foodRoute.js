import express from "express"
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer";
// import multer from "multer";

const foodRouter=express.Router();


//Image Storage engine;
// const storage=multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// })


const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage:storage})

foodRouter.post("/add", upload.single("image"), (req, res, next) => {
    console.log("Uploaded file:", req.file); // Debug log
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    next();
}, addFood);

foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);



export default foodRouter;
