import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const type1 = "/anime";
const type2 = "/manga";

const currentType = type2;

const API_URL = "https://api.jikan.moe/v4";

//================ 
// HOME
//================
app.get("/", async(req,res)=>{
    try{
        const result = await axios.get(API_URL+"/random"+currentType);

        let result2 = result.data.data;

        const data = result.data.data.url;
        const title = result.data.data.titles;
        const image = result.data.data.images.jpg.image_url;
        const synopsis = result2.synopsis;
        res.render("home.ejs",{content: data,titles:title, coverImage: image,synopsis:synopsis});
        

    } catch(error){
        res.render("home.ejs", {content: error.response});
    }
});

// ================ 
// RANDOM QUERY
// ================

app.get("/random", async(req,res)=>{
    try{
        const result = await axios.get(API_URL+"/random"+currentType);

        let result2 = result.data.data;

        const data = result.data.data.url;
        const title = result.data.data.titles;
        const image = result.data.data.images.jpg.image_url;
        const synopsis = result2.synopsis;

        res.render("random.ejs",{
            content: data,titles:title, 
            coverImage: image,
            synopsis:synopsis
        });

    } catch(error){
        res.render("random.ejs", {content: error.response});
    }
});

//================
// SEARCH QUERY
//================
//The search bar default
app.get("/search", async(req,res)=>{
    try{
        const result = await axios.get(API_URL+"/random+"+currentType);

        res.render("search.ejs");

    } catch(error){
        res.render("search.ejs", {content: error.response});
    }

});

//The search Result
app.post("/search", async(req,res)=>{
    var searchrQuery = req.body["searchquery"];
    
    //Console Check
    console.log("======================")
    console.log(`Title: ${searchrQuery}`);


    try{
        const result = await axios.get(API_URL+currentType,{
            params:{
                q: searchrQuery,
                sfw: true
            }
        });
        
        //datacheck
        // console.log("Title:"+result.data.data[0].title);

        res.render("search.ejs",{
            itemsearched: searchrQuery,
            searchResult: result.data
        });

    }catch(err){
        res.render("search.ejs",{content: error.response});
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})