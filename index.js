import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;
const API_URL = "https://api.mangadex.org/";

app.use(express.static("public"));
const title = 'Itsuka Fukushuu Suru so no Tame ni';



app.get("/", async(req,res)=>{
    try{
        const firstResponse = await axios.get(API_URL+"/manga",{
            params:{
                title: title
            }
        });

        const coverID = firstResponse.data.data.map(manga => manga.relationships[2].id);

        const secondResponse = await axios.get(API_URL+"/cover"+ coverID);
        console.log("Cover Data:" + secondResponse.data.data);
        
        res.render("index.ejs", {
            content: firstResponse.data.data.map(manga => manga.attributes.title.en), 
            content2: firstResponse.data.data.map(manga => manga.attributes.year),
            content3: coverID 
        });

        // //COVER JPG FILE ID
        // const result2 =await axios.get(API_URL+"/cover"+item);
        
        // console.log("Cover File:" + coverFile);
        

        //GET MANGA ID
        // var mangaID = result.data.data.map(manga => manga.id)
        // //GET COVER ID
        // var item = result.data.data.map(manga => manga.relationships[2].id)
        // //GET COVERFILE
        // var coverFile = result2.data.data.map(manga => manga.attributes.fileName);
        
        //COVER ART [TO BE DONE AFTER I CONFIRM COVER FILE]
        // const result3 =await axios.get("https://uploads.mangadex.org/covers/"+mangaID);

    

    } catch(error){
        res.render("index.ejs", {content: error.response});
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})