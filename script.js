const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const favoriteButton = document.getElementById("add-favorite-button");

// Search button to retrieve Pokémon info based on user input
searchButton.addEventListener("click", async function () {
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

  // Get pokemons
  async function fetchPokemons() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/", {
      method: "GET",
      headers: {},
    });
    let data = await response.json();
    return data;
  }

  fetchPokemons();

  // Fetch Pokémon data
  async function fetchPokemonData(inputValue) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data = await response.json();

      // Update Pokémon details
      document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
      document.getElementById("pokemon-id").textContent = `#${data.id}`;
      document.getElementById("weight").textContent = data.weight;
      document.getElementById("height").textContent = data.height;
      document.getElementById("hp").textContent = data.stats.find(
        (stat) => stat.stat.name === "hp"
      ).base_stat;
      document.getElementById("attack").textContent = data.stats.find(
        (stat) => stat.stat.name === "attack"
      ).base_stat;
      document.getElementById("defense").textContent = data.stats.find(
        (stat) => stat.stat.name === "defense"
      ).base_stat;
      document.getElementById("special-attack").textContent = data.stats.find(
        (stat) => stat.stat.name === "special-attack"
      ).base_stat;
      document.getElementById("special-defense").textContent = data.stats.find(
        (stat) => stat.stat.name === "special-defense"
      ).base_stat;
      document.getElementById("speed").textContent = data.stats.find(
        (stat) => stat.stat.name === "speed"
      ).base_stat;

      // Add sprite image
      const sprite = document.createElement("img");
      sprite.id = "sprite";
      sprite.src = data.sprites.front_default;
      pokemonInfo.appendChild(sprite);

      // Add types
      const types = document.getElementById("types");
      data.types.forEach((typeInfo) => {
        const typeSpan = document.createElement("span");
        typeSpan.textContent = typeInfo.type.name;
        types.appendChild(typeSpan);
      });

      // Enable favorite button
      favoriteButton.disabled = false;

      // Store the current Pokémon data for future use
      favoriteButton.dataset.pokemon = JSON.stringify({
        name: data.name,
        id: data.id,
        weight: data.weight,
        height: data.height,
        types: data.types.map((typeInfo) => typeInfo.type.name),
        stats: data.stats.reduce((acc, stat) => {
          acc[stat.stat.name] = stat.base_stat;
          return acc;
        }, {}),
        sprite: data.sprites.front_default,
      });
    } catch (error) {
      alert(error.message);
      favoriteButton.disabled = true;
      console.error("There was a problem:", error);
    }
  }

  await fetchPokemonData(inputValue);
});

// Store Pokémon in favorites
favoriteButton.addEventListener("click", function () {
  const pokemonData = JSON.parse(favoriteButton.dataset.pokemon);
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if Pokémon is already in favorites
  const exists = favorites.some((pokemon) => pokemon.id === pokemonData.id);
  if (!exists) {
    favorites.push(pokemonData);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${pokemonData.name} has been added to your favorites!`);
  } else {
    alert(`${pokemonData.name} is already in your favorites!`);
  }
});
