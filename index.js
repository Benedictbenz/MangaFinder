import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const API_URL = "https://api.jikan.moe/v4";

//================ 
// HOME QUERY
//================
app.get("/", async(req,res)=>{
    try{
        const result = await axios.get(API_URL+"/random/manga",);

        let result2 = result.data.data;

        const data = result.data.data.url;
        const title = result.data.data.titles;
        const image = result.data.data.images.jpg.image_url;
        const synopsis = result2.synopsis;
        res.render("index.ejs",{content: data,titles:title, coverImage: image,synopsis:synopsis});

    } catch(error){
        res.render("index.ejs", {content: error.response});
    }
});

// ================ 
// RANDOM QUERY
// ================

app.get("/random", async(req,res)=>{
    try{
        const result = await axios.get(API_URL+"/random/manga",);

        let result2 = result.data.data;

        const data = result.data.data.url;
        const title = result.data.data.titles;
        const image = result.data.data.images.jpg.image_url;
        const synopsis = result2.synopsis;
        res.render("random.ejs",{content: data,titles:title, coverImage: image,synopsis:synopsis});
    } catch(error){
        res.render("random.ejs", {content: error.response});
    }
});

//================
// SEARCH QUERY
//================

app.get("/random", async(req,res)=>{
    try{
        const result = await axios.get(API_URL+"/random/manga",);

        let result2 = result.data.data;

        const data = result.data.data.url;
        const title = result.data.data.titles;
        const image = result.data.data.images.jpg.image_url;
        const synopsis = result2.synopsis;
        res.render("random.ejs",{content: data,titles:title, coverImage: image,synopsis:synopsis});
    } catch(error){
        res.render("random.ejs", {content: error.response});
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})