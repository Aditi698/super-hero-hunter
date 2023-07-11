// This function saves the current selected superhero to the local storage
function setSuperHero(hero) {
  localStorage.setItem("currentSuperhero", JSON.stringify(hero));
}

// This function retrieves the current selected superhero from local storage
// If there is no superhero saved, it returns false
function getSuperHero() {
  return JSON.parse(localStorage.getItem("currentSuperhero")) || false;
}

// This function retrieves the list of favorite superheroes from local storage
// If there are no favorites saved, it returns an empty array
function getFavourites() {
  return JSON.parse(localStorage.getItem("favoutites")) || [];
}

// This function saves a superhero to the list of favorite superheroes in local storage
function setFavoutites(hero) {
  const existingHeros = getFavourites();

  // If there are already favorites saved, it adds the new hero to the beginning of the list
  if (existingHeros.length) {
    localStorage.setItem(
      "favoutites",
      JSON.stringify([hero, ...existingHeros])
    );
  }
  // If there are no favorites saved, it creates a new list with the selected hero
  else {
    localStorage.setItem("favoutites", JSON.stringify([hero]));
  }
}

// This function removes a superhero from the list of favorite superheroes in local storage
function removeFavoutites(hero) {
  const existingHeros = getFavourites();

  // Filters out the superhero with the matching ID
  const filteredHeros = existingHeros.filter((item) => item.id !== hero.id);

  // Saves the new list of favorite superheroes to local storage
  localStorage.setItem("favoutites", JSON.stringify([...filteredHeros]));
}

// This function retrieves the IDs of the favorite superheroes from local storage
// If there are no favorites saved, it returns an empty array
function getFavouritesID() {
  const existingHeros = getFavourites();
  const Ids = [];

  // If there are favorite superheroes saved, it pushes their IDs to the Ids array
  if (existingHeros.length) {
    existingHeros.forEach((fav) => {
      Ids.push(fav.id);
    });
  }

  return Ids;
}
