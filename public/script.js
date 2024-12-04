document.getElementById('fetchButton').addEventListener('click', fetchPokemonAbilities);

function fetchPokemonAbilities() {
    const pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
    const outputDiv = document.getElementById('output');

    outputDiv.innerHTML = '';

    if (!pokemonName) {
        outputDiv.innerHTML = '<p class="error">Por favor, insira o nome de um Pokémon.</p>';
        return;
    }

    //realiza a requisição para a API backend
    fetch(`/api/pokemons/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                outputDiv.innerHTML = `<p class="error">${data.error}</p>`;
                return;
            }

            //exibe o nome, habilidades e a imagem do Pokémon
            outputDiv.innerHTML = `
                <h2>${data.pokemon.charAt(0).toUpperCase() + data.pokemon.slice(1)}</h2>
                <p><strong>Habilidades:</strong><br>${data.abilities.join(', ')}</p>
                <img src="${data.imageUrl}" alt="Imagem de ${data.pokemon}" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;">
            `;
        })
        .catch(error => {
            outputDiv.innerHTML = '<p class="error">Erro ao buscar Pokémon.</p>';
            console.error('Erro:', error);
        });
}
