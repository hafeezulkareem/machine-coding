/* 
1. User should be able to search for a text
2. User should be able to see the maximum of 10 suggestions that are matched with search text
3. User should be able to highlight the option using up and down arrows and make circular
4. User should be able to select an option
5. User should be able to remove the search text
6. User should be able to see no suggestions text if there are not search suggestions
*/

// Simulating search API with promise
function fetchData(searchText) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const items = data.filter((item) =>
        item.body.toLowerCase().includes(searchText.toLowerCase())
      );
      resolve(items);
    }, 3000);
  });
}

function getElement(selector) {
  return document.querySelector(selector);
}

function renderSuggestions(suggestions) {
  const suggestionsContainer = getElement("#suggestions");

  const options = document.createDocumentFragment();

  if (suggestions.length === 0) {
    const emptyTextPara = document.createElement("p");
    emptyTextPara.textContent = "There no suggestions for you";

    options.appendChild(emptyTextPara);
    suggestionsContainer.classList.add("empty");
  } else {
    for (const suggestion of suggestions) {
      const suggestionPara = document.createElement("p");
      suggestionPara.textContent = suggestion.body;
      suggestionPara.classList.add("suggestion");

      options.appendChild(suggestionPara);
    }
    suggestionsContainer.classList.remove("empty");
  }

  suggestionsContainer.replaceChildren(options);
}

async function onChangeSearchInput(event) {
  const searchText = event.target.value.trim();

  let suggestions = [];
  if (searchText.length > 0) {
    suggestions = await fetchData(searchText);
  }

  const tenSuggestions = suggestions.slice(0, 10);
  renderSuggestions(tenSuggestions);
}

function debounce(callback, delay) {
  let timeout;

  return function debouncedCallback(...args) {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => callback(...args), delay);
  };
}

function onFocusInput() {
  const suggestionsContainer = getElement("#suggestions");
  suggestionsContainer.style.display = "flex";
}

function onBlurInput() {
  const suggestionsContainer = getElement("#suggestions");
  suggestionsContainer.style.display = "none";

  for (const child of suggestionsContainer.children) {
    child.classList.remove("highlight");
  }
}

function start() {
  const inputEl = getElement("#searchInput");

  const debouncedOnChange = debounce(onChangeSearchInput, 500);

  inputEl.addEventListener("input", debouncedOnChange);
  inputEl.addEventListener("focus", onFocusInput);
  inputEl.addEventListener("blur", onBlurInput);
}

start();
