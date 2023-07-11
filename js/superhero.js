// This code adds an event listener to the window object that listens for the "load" event and calls the onload function when it occurs.
window.addEventListener("load", (event) => onload(event));

// This is the onload function that gets called when the "load" event occurs. It retrieves superhero data and renders it on the webpage.
const onload = (e) => {
  const data = getSuperHero();
  if (data) {
    renderSuperHero(data);
  } else {
    // If there is no superhero data
    noData();
  }
};

// This function generates a random integer between a given minimum and maximum value (default values are set if none are provided).
function randomIntFromInterval(min = 30, max = 100) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// This variable stores the ID of the timer that displays a message on the webpage.
let messageTimer;

// This function displays a message on the webpage for a certain amount of time (3 seconds by default).
function showMessage(msg) {
  const messageDiv = document.getElementById("message-container");
  const message = document.getElementById("message");
  message.innerHTML = msg;

  // If there is already a timer running, clear it and remove the "show" class from the message container.
  if (messageTimer) {
    clearTimeout(messageTimer);
    messageDiv.classList.remove("show");
  }
  messageDiv.classList.remove("show");

  // Start a new timer that removes the "show" class from the message container after a certain amount of time.
  messageTimer = setTimeout(function () {
    messageDiv.classList.remove("show");
  }, 3000);

  setTimeout(function () {}, 3000);

  // Add the "show" class to the message container to display the message.
  messageDiv.classList.add("show");
}

// This function removes a superhero from the user's list of favorites.
function removeFavourite(hero) {
  // Get the IDs of all favorite superheroes.
  const favoutitesIDs = getFavouritesID();

  // Check if the current superhero's ID is in the list of favorites.
  if (favoutitesIDs.includes(hero.id)) {
    // Remove the superhero from the list of favorites.
    removeFavoutites(hero);
    showMessage("Hero removed successfully from favourits!");
  } else {
    // Display a message indicating that the superhero is not in the list of favorites.
    showMessage("Hero does not exists in favourits!");
  }
}

// This function adds a superhero to the user's list of favorites.
function addFavourite(hero) {
  // Get the IDs of all favorite superheroes.
  const favoutitesIDs = getFavouritesID();

  // Check if the current superhero's ID is in the list of favorites.
  if (favoutitesIDs.includes(hero.id)) {
    // Display a message indicating that the superhero is already in the list of favorites.
    showMessage("Hero already exists in favourits!");
  } else {
    // Add the superhero to the list of favorites.
    setFavoutites(hero);
    showMessage("Hero added successfully in favourits!");
  }
}

function changeFavicon(src) {
  // Define a function named "changeFavicon" with a parameter "src"
  let link = document.createElement("link"); // Create a new <link> element and assign it to a variable named "link"
  let oldLink = document.getElementById("favicon"); // Find the existing <link> element with an id "favicon" and assign it to a variable named "oldLink"
  link.id = "favicon"; // Set the id of the new <link> element to "favicon"
  link.rel = "icon"; // Set the relationship of the new <link> element to "icon"
  link.href = src; // Set the href attribute of the new <link> element to the value of the "src" parameter
  if (oldLink) {
    // If an existing <link> element with id "favicon" is found
    document.head.removeChild(oldLink); // Remove the existing <link> element from the <head> of the document
  }
  document.head.appendChild(link); // Add the new <link> element to the <head> of the document
}

const renderSuperHero = (hero) => {
  // change document title to the current superhero selected
  document.title = hero.name;

  // change tab favicon to the hero image (the tab icon)
  changeFavicon(hero.image.url);
  // Get the container elements
  const container = document.getElementById("superhero-container");
  const imageContainer = document.getElementById("image-container");

  // Create an img element for the hero image
  const heroImg = document.createElement("img");
  heroImg.id = "superhero-image";
  heroImg.src = hero.image.url;
  heroImg.alt = hero.name;
  heroImg.className = "superhero-image";

  // Create buttons for adding and removing from favorites
  const addButton = document.createElement("button");
  addButton.innerText = "Add to Favourite";
  addButton.classList = "add-to-favorite";
  addButton.addEventListener("click", () => addFavourite(hero));

  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove from Favourite";
  removeButton.classList = "remove-from-favorite";
  removeButton.addEventListener("click", () => removeFavourite(hero));

  // Create a container for the hero name and powerstats
  const superheroInfoContainer = document.createElement("div");
  superheroInfoContainer.className = "superhero-info-container";

  // Create an h1 element for the hero name
  const heroTitle = document.createElement("h1");
  heroTitle.id = "superhero-title";
  heroTitle.innerHTML = hero.name;
  heroTitle.className = "superhero-title";

  // Create a container for the powerstats
  const powerStatContainer = document.createElement("div");
  powerStatContainer.className = "powerstat-container";

  // Iterate over the powerstats in the hero object
  Object.keys(hero.powerstats).map((powerstats) => {
    // Set the percentage value for the powerstat, or generate a random value if it is not provided
    const percent = hero.powerstats[powerstats]
      ? hero.powerstats[powerstats]
      : randomIntFromInterval();

    // Create a container for the powerstat and its percentage display
    const statContainer = document.createElement("div");
    statContainer.className = "stats";

    // Create a div for the percentage display, styled as a circle with the given percentage
    const percentCircleDiv = document.createElement("div");
    percentCircleDiv.className = `circle percentage-${percent}`;

    // Create a span to display the percentage value
    const statPercentSpan = document.createElement("span");
    statPercentSpan.innerHTML = percent + "%";

    // Create a div for the percentage bar
    const percentageBarrDiv = document.createElement("div");
    percentageBarrDiv.className = "percentage-bar";

    // Create a p element for the powerstat title
    const statTitleP = document.createElement("p");
    statTitleP.innerHTML = powerstats;

    // Add the percentage display and title to the powerstat container
    percentCircleDiv.appendChild(statPercentSpan);
    percentCircleDiv.appendChild(percentageBarrDiv);
    statContainer.appendChild(percentCircleDiv);
    statContainer.appendChild(statTitleP);
    powerStatContainer.appendChild(statContainer);
  });

  // Add the hero name and powerstats containers to the superheroInfoContainer
  superheroInfoContainer.appendChild(heroTitle);
  superheroInfoContainer.appendChild(powerStatContainer);

  // Add the hero image, add-to-favorite button, and remove-from-favorite button to the imageContainer
  imageContainer.appendChild(heroImg);
  imageContainer.appendChild(addButton);
  imageContainer.appendChild(removeButton);

  // Add the superheroInfoContainer to the main container
  container.appendChild(superheroInfoContainer);
};

// Define the noData function that displays a message when there are no favourite items
function noData() {
  // Get the HTML element where the image cards will be added
  const container = document.getElementById("superhero-container");
  // Set the class of the element to "no-data-div"
  container.classList = "no-data-div";

  // Create a paragraph element to display the "no data" message
  const title = document.createElement("h2");
  title.innerHTML = "Failed to load data!";
  title.className = "no-data";

  // Add the "no data" message to the HTML element
  container.appendChild(title);
}
