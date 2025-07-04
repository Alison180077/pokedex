const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const flipSound = document.getElementById("flipSound")

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
      <div class="flip-card" onclick="this.classList.toggle('flipped'); document.getElementById('flipSound').currentTime = 0; document.getElementById('flipSound').play();">
        <div class="flip-card-inner">
          
          <!-- Frente -->
          <div class="flip-card-front">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>
              <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
          </div>

          <!-- Verso -->
          <div class="flip-card-back">
            <p>Altura: ${pokemon.height} m</p>
            <p>Peso: ${pokemon.weight} kg</p>
            <p>Habilidades: ${pokemon.abilities.join(', ')}</p>
          </div>

        </div>
      </div>
    </li>
  `;
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    } 

  
})
