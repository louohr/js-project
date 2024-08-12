function savePokemonData(pokemon) {
  let savedPokemon = JSON.parse(localStorage.getItem("savedPokemon")) || [];
  savedPokemon.push(pokemon);
  localStorage.setItem("savedPokemon", JSON.stringify(savedPokemon));
}

function getSavedPokemon() {
  return JSON.parse(localStorage.getItem("savedPokemon")) || [];
}

function updatePokemonData(updatedPokemon) {
  let savedPokemon = JSON.parse(localStorage.getItem("savedPokemon")) || [];
  const index = savedPokemon.findIndex((pokemon) => pokemon.id === updatedPokemon.id);
  if (index !== -1) {
    savedPokemon[index] = updatedPokemon;
    localStorage.setItem("savedPokemon", JSON.stringify(savedPokemon));
  }
}

function deletePokemonData(pokemonId) {
  let savedPokemon = JSON.parse(localStorage.getItem("savedPokemon")) || [];
  savedPokemon = savedPokemon.filter((pokemon) => pokemon.id !== pokemonId);
  localStorage.setItem("savedPokemon", JSON.stringify(savedPokemon));
}

searchButton.addEventListener("click", function () {
  const inputValue = searchInput.value.toLowerCase().trim();
  const pokemonInfo = document.getElementById("pokemon-info");

  // Clear previous content
  pokemonInfo.querySelectorAll("span").forEach((span) => (span.textContent = ""));
  document.getElementById("types").innerHTML = "";

  // Remove existing sprite if any
  const existingSprite = document.getElementById("sprite");
  if (existingSprite) {
    existingSprite.remove();
  }

  // Fetch data from PokeAPI
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      return response.json();
    })
    .then((data) => {
      const pokemonData = {
        id: data.id,
        name: data.name.toUpperCase(),
        weight: data.weight,
        height: data.height,
        types: data.types.map((typeInfo) => typeInfo.type.name),
        stats: {
          hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat,
          attack: data.stats.find((stat) => stat.stat.name === "attack").base_stat,
          defense: data.stats.find((stat) => stat.stat.name === "defense").base_stat,
          specialAttack: data.stats.find((stat) => stat.stat.name === "special-attack").base_stat,
          specialDefense: data.stats.find((stat) => stat.stat.name === "special-defense").base_stat,
          speed: data.stats.find((stat) => stat.stat.name === "speed").base_stat,
        },
        sprite: data.sprites.front_default,
      };

      // Update UI
      document.getElementById("pokemon-name").textContent = pokemonData.name;
      document.getElementById("pokemon-id").textContent = `#${pokemonData.id}`;
      document.getElementById("weight").textContent = pokemonData.weight;
      document.getElementById("height").textContent = pokemonData.height;
      document.getElementById("hp").textContent = pokemonData.stats.hp;
      document.getElementById("attack").textContent = pokemonData.stats.attack;
      document.getElementById("defense").textContent = pokemonData.stats.defense;
      document.getElementById("special-attack").textContent = pokemonData.stats.specialAttack;
      document.getElementById("special-defense").textContent = pokemonData.stats.specialDefense;
      document.getElementById("speed").textContent = pokemonData.stats.speed;

      // Add image
      const sprite = document.createElement("img");
      sprite.id = "sprite";
      sprite.src = pokemonData.sprite;
      pokemonInfo.appendChild(sprite);

      // Add types
      const types = document.getElementById("types");
      pokemonData.types.forEach((type) => {
        const typeSpan = document.createElement("span");
        typeSpan.textContent = type;
        types.appendChild(typeSpan);
      });

      // Save data to localStorage
      savePokemonData(pokemonData);
      displaySavedPokemon();
    })
    .catch((error) => {
      alert(error.message);
    });
});
