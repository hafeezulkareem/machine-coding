const root = document.getElementById("root");

const items = [
  {
    title: "Step 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec tincidunt praesent semper feugiat nibh. Condimentum vitae sapien pellentesque habitant. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Lacus sed turpis tincidunt id aliquet risus. Tellus id interdum velit laoreet id donec ultrices.",
  },
  {
    title: "Step 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec tincidunt praesent semper feugiat nibh. Condimentum vitae sapien pellentesque habitant. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Lacus sed turpis tincidunt id aliquet risus. Tellus id interdum velit laoreet id donec ultrices.",
  },
  {
    title: "Step 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec tincidunt praesent semper feugiat nibh. Condimentum vitae sapien pellentesque habitant. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Lacus sed turpis tincidunt id aliquet risus. Tellus id interdum velit laoreet id donec ultrices.",
  },
];

function createAccordionItem(id, item, onClick) {
  const accordionItem = document.createElement("div");
  accordionItem.classList.add("accordion-item");

  const header = document.createElement("div");
  header.classList.add("header");

  const title = document.createElement("p");
  title.textContent = item.title;
  title.classList.add("title");

  const arrow = document.createElement("i");
  arrow.classList.add("arrow", "ri-arrow-down-s-line");

  header.appendChild(title);
  header.appendChild(arrow);
  header.addEventListener("click", () => onClick(id));

  const description = document.createElement("p");
  description.textContent = item.description;
  description.classList.add("description");

  accordionItem.appendChild(header);
  accordionItem.appendChild(description);

  return accordionItem;
}

function renderAccordion() {
  const accordion = document.createElement("div");
  accordion.id = "accordion";
  for (let i = 0; i < items.length; i++) {
    accordion.appendChild(
      createAccordionItem(i, items[i], onClickAccordionItem)
    );
  }
  root.appendChild(accordion);
}

function onClickAccordionItem(id) {
  const accordion = document.getElementById("accordion");
  const accordionItems = accordion.querySelectorAll(".accordion-item");
  for (let i = 0; i < accordionItems.length; i++) {
    const item = accordionItems[i];
    if (id === i) {
      item.classList.toggle("opened");
    }
  }
}

renderAccordion();
