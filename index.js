const express = require('express'); 
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

//servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

//middleware para buscar habilidades do Pokémon
app.get('/api/pokemons/:poke_name', async (req, res) => {
  const pokeName = req.params.poke_name;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`);
    
    //extrai habilidades e ordena
    const abilities = response.data.abilities.map((ability) => ability.ability.name).sort();
    
    //pega a url da imagem do pokémon
    const imageUrl = response.data.sprites.front_default;

    res.json({ pokemon: pokeName, abilities, imageUrl });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "Pokémon não encontrado!" });
    } else {
      res.status(500).json({ error: "Falha ao buscar informações do Pokémon." });
    }
  }
});

//inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
