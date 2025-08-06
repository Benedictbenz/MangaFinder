import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4";

app.use(express.static("public"));

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

//test
async function getCharacterAnimeByName(name) {
  try {
    // 1. Search character by name
    const searchUrl = `https://api.jikan.moe/v4/characters?q=${name}`;
    const searchResponse = await axios.get(searchUrl);

    // 2. Get the first character result
    const character = searchResponse.data.data[0];

    if (!character) {
      console.log("Character not found.");
      return;
    }

    const characterId = character.mal_id;
    console.log(`Found ${character.name} with ID: ${characterId}`);

    // 3. Fetch anime appearances
    const animeUrl = `https://api.jikan.moe/v4/characters/${characterId}/anime`;
    const animeResponse = await axios.get(animeUrl);

    const appearances = animeResponse.data.data;
    console.log(`${character.name} appears in:`);
    appearances.forEach(entry => {
      console.log(`- ${entry.anime.title}`);
    });

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

// Example usage
getCharacterAnimeByName("Boruto");


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})