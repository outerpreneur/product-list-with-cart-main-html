document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("dessert-container");
      data.forEach((dessert) => {
        const card = document.createElement("div");
        card.className = "dessert-card";
        card.innerHTML = `
          <picture class="relative">
            <source srcset="${dessert.image.mobile}" media="(max-width: 599px)" type="image/webp" />
            <source srcset="${dessert.image.tablet}" media="(min-width: 600px) and (max-width: 1199px)" type="image/webp" />
            <source srcset="${dessert.image.desktop}" media="(min-width: 1200px)" type="image/webp" />
            <img src="${dessert.image.desktop}" alt="${dessert.name}" />
            <button class="bg-white text-rose-900 py-2 px-5 rounded-3xl border border-rose-400  absolute bottom-[-18px] left-1/2 transform -translate-x-1/2 flex gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>Add to Cart</button>
          </picture>
          <div class="mt-8">
            <p class="text-rose-500">${dessert.category}</p>
            <h3 >${dessert.name}</h3>
            <p class="text-red">${dessert.price}</p>
          </div>
          
        `;
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
