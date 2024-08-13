document.addEventListener("DOMContentLoaded", function () {
  const favoritesContainer = document.getElementById("favorites-container");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favoritesContainer) {
    favoritesContainer.innerHTML = "";
    if (favorites.length === 0) {
      favoritesContainer.innerHTML = `
                <p class="no-favorites-message">
                    No favorite pokemon.<br>
                </p>
            `;
      return;
    }
    // create card to display pokemon
    favorites.forEach((pokemon) => {
      const pokemonCard = document.createElement("div");
      pokemonCard.classList.add("pokemon-card");

      // name
      const name = document.createElement("h2");
      name.textContent = pokemon.name;
      pokemonCard.appendChild(name);

      // sprite image
      const sprite = document.createElement("img");
      sprite.src = pokemon.sprite;
      pokemonCard.appendChild(sprite);

      favoritesContainer.appendChild(pokemonCard);
    });
  }
});
