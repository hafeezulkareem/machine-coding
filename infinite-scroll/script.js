const container = document.querySelector("#container");

function addElementsToContainer(count = 10) {
  const elements = document.createDocumentFragment();
  for (let i = 1; i <= count; i++) {
    const p = document.createElement("p");
    p.classList.add("line");
    p.textContent = i;
    elements.appendChild(p);
  }
  container.appendChild(elements);
}

addElementsToContainer();

function onScrollContainer(event) {
  const container = event.target;

  const totalHeight = container.scrollHeight;
  const topScroll = container.scrollTop;
  const height = container.clientHeight;

  if (topScroll + height >= totalHeight) {
    addElementsToContainer();
  }
}

function onScrollDocument() {
  const container = document.documentElement;

  const totalHeight = container.scrollHeight;
  const topScroll = container.scrollTop;
  const height = container.clientHeight;

  if (topScroll + height >= totalHeight) {
    addElementsToContainer();
  }
}

// document.addEventListener("scroll", onScrollContainer);

container.addEventListener("scroll", onScrollContainer);
