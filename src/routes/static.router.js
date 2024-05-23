import express from "express"; 
const staticRouter = express.Router()
import URL from "../models/url.model.js";


staticRouter.get('/', async (req,res)=>{
    const allurls = await URL.find({}); 
    return res.render("home" , {
        urls:allurls, 
    })
})

export default staticRouter; 