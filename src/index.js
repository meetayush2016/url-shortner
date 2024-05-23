// import mongoose from "mongoose";
import express from "express"; 
import urlRouter from "./routes/url.router.js"
import connectDB from "./db/db.connect.js";
import URL from "./models/url.model.js";
import path from 'path';
import staticRouter from "./routes/static.router.js"




connectDB("mongodb://localhost:27017/shortUrl"); 

const app = express();
const port = 8001; 


app.use(express.json()); 
app.use(express.urlencoded({extended:false})); 


app.set('view engine', 'ejs');
app.set('views', path.resolve("./src/views")); 


app.get("/test" , async (req,res)=>{
    const allUrls = await URL.find({}); 
    return res.render("home",{
        urls: allUrls, 
    }); 
}); 



app.use("/url" , urlRouter); 

app.use("/" , staticRouter); 


app.get('/url/:shortId', async(req,res)=>{ //I have changed something here /... make sure to remember this
    const shortId = req.params.shortId; 
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timesstamp:Date.now(), 
        }, 
    }}); 
    res.redirect(entry.redirectURL); 

})

app.listen(port , ()=>{
    console.log(`Server is running on url http://localhost:${port}`);
})