// This function returns a debounced version of the provided function
// which delays the execution of the function until a certain time has passed
// since the last time the function was called.
let timeout;
function debounce(func, wait = 400) {
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// This function calls the getSearchValue function after debouncing it
// so that it's not called multiple times in quick succession
const search = () => debounce(getSearchValue)();

// This function gets the value of the search box and calls handleSearch
// to perform the search using the Superhero API
function getSearchValue() {
  const searchBox = document.getElementById("search-box");
  const searchText = searchBox.value; // gets the string that is typed

  clearList(); // clears the previous search results from the list
  toggleLoading(false); // hides the loading spinner

  if (searchText) {
    handleSearch(searchText); // calls the API to perform the search
  }
}

// This function calls the Superhero API to perform a search for the provided search text
const handleSearch = async (searchText = "") => {
  let url = `https://www.superheroapi.com/api.php/1808866516162142/search/${searchText.trim()}`;
  try {
    toggleLoading(true); // shows the loading spinner
    const response = await fetch(url);
    let data = await response.json();
    if (data.response === "success") {
      showSearchList(data.results); // shows the search results on the page
      toggleLoading(false); // hides the loading spinner
    } else {
      toggleLoading(true, "No data found!"); // shows an error message
    }
  } catch (error) {
    console.log(error);
  }
};

// This function toggles the visibility of the loading spinner and search list,
// and optionally displays a message.
function toggleLoading(loading, message = "") {
  const searchList = document.getElementById("search-list"); // get the search list element
  const loadingContainer = document.getElementById("loading"); // get the loading spinner element

  // Show the search list if it was previously hidden and the loading spinner is now displayed.
  if (
    loading &&
    searchList &&
    searchList.className === "search-list-no-visible"
  ) {
    searchList.className = "search-list";
  }

  // Set the message text if a message is provided.
  if (message) {
    const messageEle = document.getElementById("message"); // get the message element
    messageEle.innerText = message;
  }

  // Show the loading spinner if it's currently hidden.
  if (loading && loadingContainer.className !== "loading") {
    loadingContainer.className = "loading";
  }

  // Hide the loading spinner if it's currently displayed.
  if (!loading) {
    loadingContainer.className = "loading-no-visible";
  }
}

// This function clears the search list.
function clearList() {
  const searchList = document.getElementById("search-list"); // get the search list element

  // Remove all child nodes of the search list until the last child node is the loading spinner.
  while (searchList.hasChildNodes() && searchList.lastChild.id !== "loading") {
    searchList.removeChild(searchList.lastChild);
  }

  // Hide the search list.
  searchList.className = "search-list-no-visible";
}

// This function displays the search results in the search list.
// It expects an array of objects, each representing a search result.
function showSearchList(data = []) {
  const searchList = document.getElementById("search-list");

  // Show the search list if it's hidden.
  searchList.className = "search-list";

  // If there are search results, create an <a> element for each and add it to the search list.
  if (searchList && data.length) {
    data.forEach((item, index) => {
      const link = document.createElement("a");
      link.className = "link";
      link.href = `superhero.html?${item.id}`;

      const linkImage = document.createElement("img");
      linkImage.src = item.image.url;
      linkImage.alt = item.name;
      linkImage.className = "link-img";

      const linkText = document.createElement("span");
      linkText.innerText = item.name;

      link.appendChild(linkImage);
      link.appendChild(linkText);
      searchList.appendChild(link);

      // Add a click event listener to each link that calls the handleLinkClick function.
      link.addEventListener("click", (e) => handleLinkClick(e, item));
    });
  }
}

// This function handles the click event on a search result link.
function handleLinkClick(e, item) {
  // Set the selected superhero and clear the search list.
  setSuperHero(item);
  clearList();
}

// Add a click event listener to the window object.
window.addEventListener("click", (e) => {
  if (!document.getElementById("search-container").contains(e.target)) {
    // If the click is outside the search container, hide the search list and loading spinner.
    const searchList = document.getElementById("search-list");
    searchList.className = "search-list-no-visible";
    toggleLoading(false);
  } else {
    // If the click is inside the search container, call the getSearchValue function to initiate a search.
    getSearchValue();
  }
});
