import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const type1 = "/anime";
const type2 = "/manga";

const currentType = type1;

const API_URL = "https://api.jikan.moe/v4";

//================ 
// HOME
//================
app.get("/", async(req,res)=>{

    res.render("home.ejs");
});

// ================ 
// QUERY
// ================
//[GET]
app.get("/random", async(req,res)=>{

    try{
        await randomviewer(res); 
    } catch(error){
        res.render("viewSelection.ejs", {content: error.response});
    }

});

//[POST]
app.post("/view",async(req,res) =>{
    try{
        await selectedViewer(req,res);
    } catch(error){
        res.render("viewSelection.ejs", {content: error.response});
    }
});

async function renderViewer(res,url) {
    const result = await axios.get(url);
    const result2 = result.data.data;

    const data = result.data.data;
    const title = result.data.data.title;
    const image = result.data.data.images.jpg.image_url;
    const synopsis = result2.synopsis;

    res.render("viewSelection.ejs",{
            
            content: data,
            title:title, 
            coverImage: image,
            synopsis:synopsis
        });
}


async function selectedViewer(req,res) {

    var data_id = req.body.id;
    const url = `${API_URL}${currentType}/${data_id}`;
    await renderViewer(res,url);

}

async function randomviewer(res){
    const url = `${API_URL}/random${currentType}`;
    await renderViewer(res,url);
}



//================
// SEARCH QUERY
//================

//The search bar default [ GET ]
app.get("/search", async(req,res)=>{
    try{
        const result = await axios.get(API_URL+"/random+"+currentType);

        res.render("search.ejs");

    } catch(error){
        res.render("search.ejs", {content: error.response});
    }

});

//The search Result [ POST ]
app.post("/search", async(req,res)=>{
    var searchrQuery = req.body.searchquery;
    var page = req.body.page||1;
    
    //Console Check
    console.log("======================")
    console.log(`Title: ${searchrQuery}`);
    console.log(`Title: ${page}`);


    try{
        const result = await axios.get(API_URL+currentType,{
            params:{
                q: searchrQuery,
                sfw: true,
                page:page
            }
        });
        
        //datacheck
        // console.log("Title:"+result.data.data[0].title);

        res.render("search.ejs",{
            itemsearched: searchrQuery,
            searchResult: result.data
        });

    }catch(err){
        res.render("search.ejs",{content: err.response});
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})