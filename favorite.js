document.addEventListener("DOMContentLoaded", function () {
  const favoritesContainer = document.getElementById("favorites-container");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    favoritesContainer.textContent = "You have no favorite Pokémon.";
    return;
  }
  // display pokemon
  favorites.forEach((pokemon) => {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    // name
    const name = document.createElement("h2");
    name.textContent = `${pokemon.name} (#${pokemon.id})`;
    pokemonCard.appendChild(name);

    // sprite image
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprite;
    pokemonCard.appendChild(sprite);

    // stats
    const stats = document.createElement("p");
    stats.classList.add("stats");

    // hp
    const hp = document.createElement("p");
    hp.textContent = `HP: ${pokemon.stats.hp}`;
    stats.appendChild(hp);

    // attack
    const attack = document.createElement("p");
    attack.textContent = `Attack: ${pokemon.stats.attack}`;
    stats.appendChild(attack);

    // defense
    const defense = document.createElement("p");
    defense.textContent = `Defense: ${pokemon.stats.defense}`;
    stats.appendChild(defense);

    // special attack
    const specialAttack = document.createElement("p");
    specialAttack.textContent = `${pokemon.name.UpperCase()} (#${pokemon.id})`;
    stats.appendChild(specialAttack);

    // special defense
    const specialDefense = document.createElement("p");
    specialDefense.textContent = `${pokemon.name.UpperCase()} (#${pokemon.id})`;
    stats.appendChild(specialDefense);

    // speed
    const speed = document.createElement("p");
    speed.textContent = `${pokemon.name.UpperCase()} (#${pokemon.id})`;
    stats.appendChild(speed);

    pokemonCard.appendChild(stats);

    // types
    const types = document.createElement("p");
    types.textContent = `Types: ${pokemon.types.join(", ")}`;
    pokemonCard.appendChild(types);

    favoritesContainer.appendChild(pokemonCard);
  });
});
