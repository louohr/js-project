document.addEventListener("DOMContentLoaded", function () {
  const favoritesContainer = document.getElementById("favorites-container");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // if no pokemon
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

    // Display for every Pokémon in cards
    favorites.forEach((pokemon, index) => {
      const pokemonCard = document.createElement("div");
      pokemonCard.classList.add("pokemon-card");

      // Sprite image
      const sprite = document.createElement("img");
      sprite.src = pokemon.sprite;
      pokemonCard.appendChild(sprite);

      // Name
      const name = document.createElement("h2");
      name.textContent = pokemon.name;
      pokemonCard.appendChild(name);

      // Remove button
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-button");
      removeButton.classList.add("remove-button:hover");
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
