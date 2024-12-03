document.getElementById('fetchButton').addEventListener('click', fetchPokemonAbilities);

function fetchPokemonAbilities() {
    const pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
    const outputDiv = document.getElementById('output');

    outputDiv.innerHTML = '';

    if (!pokemonName) {
        outputDiv.innerHTML = 'Por favor, insira o nome de um Pokémon.';
        return;
    }

    //realiza a requisição para a API backend
    fetch(`/api/pokemons/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                outputDiv.innerHTML = data.error;
                return;
            }

            //exibe o nome do Pokémon e suas habilidades
            outputDiv.innerHTML = `
                <h2>${data.pokemon.charAt(0).toUpperCase() + data.pokemon.slice(1)}</h2>
                <p><strong>Habilidades:</strong><br>${data.abilities.join(', ')}</p>
            `;
        })
        .catch(error => {
            outputDiv.innerHTML = 'Erro ao buscar Pokémon';
            console.error('Erro:', error);
        });
}
