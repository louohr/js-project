document.addEventListener("DOMContentLoaded", function () {
  const favoritesContainer = document.getElementById("favorites-container");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favoritesContainer) {
    favoritesContainer.innerHTML = "";
    if (favorites.length === 0) {
      favoritesContainer.innerHTML = `
        <p class="no-favorites-message">
          No favorite Pokémon.<br>
        </p>
      `;
      return;
    }

    // Display Pokémon
    favorites.forEach((pokemon, index) => {
      const pokemonCard = document.createElement("div");
      pokemonCard.classList.add("pokemon-card");

      // Name
      const name = document.createElement("h2");
      name.textContent = pokemon.name;
      pokemonCard.appendChild(name);

      // Sprite image
      const sprite = document.createElement("img");
      sprite.src = pokemon.sprite;
      pokemonCard.appendChild(sprite);

      const button = document.createElement("button");
      button.textContent = pokemon.name;
      pokemonCard.appendChild(name);

      // Remove button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove favorite";
      removeButton.addEventListener("click", function () {
        removeFromFavorites(index);
      });
      pokemonCard.appendChild(removeButton);

      favoritesContainer.appendChild(pokemonCard);
    });
  }

  // Function remove favorite
  function removeFromFavorites(index) {
    const updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    updatedFavorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    location.reload();
  }
});
