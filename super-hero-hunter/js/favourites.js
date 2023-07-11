// Add an event listener to the window object for the "load" event and call the onload function when it occurs
window.addEventListener("load", (event) => onload(event));

// Define the onload function that will be called when the "load" event occurs
const onload = (e) => {
  // Get all favourite items from local storage
  const favourites = getFavourites();

  // If there are favourite items, create cards for them
  if (favourites.length) {
    createCards(favourites);
  }
  // Otherwise, display a "no data" message
  else {
    noData();
  }
};

// Define the noData function that displays a message when there are no favourite items
function noData() {
  // Get the HTML element where the image cards will be added
  const imageCardsContainer = document.getElementById("favouritesDiv");
  // Set the class of the element to "no-data-div"
  imageCardsContainer.classList = "no-data-div";

  // Create a paragraph element to display the "no data" message
  const title = document.createElement("p");
  title.innerHTML = "No data available.";
  title.className = "no-data-p";

  // Add the "no data" message to the HTML element
  imageCardsContainer.appendChild(title);
}

// Define the createCards function that creates cards for each favourite item and appends them to the HTML element
function createCards(favourites) {
  // Get the HTML element where the image cards will be added
  const imageCardsContainer = document.getElementById("favouritesDiv");

  // Loop through each favourite item and create a card for it
  favourites.forEach((element) => {
    // Create a new link element with the URL to the superhero page for this item
    const card = document.createElement("a");
    card.className = "link-card";
    card.href = `superhero.html?${element.id}`;

    // Add a click event listener to the link that will call the handleLinkClick function with the item as an argument
    card.addEventListener("click", (e) => handleLinkClick(e, element));

    // Create a new image element for the card and set its source, alt text, and class
    const img = document.createElement("img");
    img.src = element.image.url;
    img.alt = element.name;
    img.className = "card-img";

    // Create a new title element for the card and set its inner HTML and class
    const title = document.createElement("h4");
    title.innerHTML = element.name;
    title.className = "card-title";

    // Append the image and title elements to the card element
    card.appendChild(img);
    card.appendChild(title);

    // Append the card element to the HTML element where the image cards will be added
    imageCardsContainer.appendChild(card);
  });
}

// Define the handleLinkClick function that sets the superhero item as the current superhero
function handleLinkClick(e, item) {
  setSuperHero(item);
}
