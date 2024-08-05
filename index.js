// display products

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("dessert-container");
    data.forEach((dessert) => {
      const card = document.createElement("div");
      card.className = "dessert-card max-w-[250px]";
      card.innerHTML = `
        <picture class="relative">
          <source srcset="${dessert.image.mobile}" media="(max-width: 599px)" type="image/webp" />
          <source srcset="${dessert.image.tablet}" media="(min-width: 600px) and (max-width: 1199px)" type="image/webp" />
          <source srcset="${dessert.image.desktop}" media="(min-width: 1200px)" type="image/webp" />
          <img class="product-image" src="${dessert.image.desktop}" alt="${dessert.name}" />
          <button class="add-to-cart bg-white text-rose-900 text-xs px-4 py-2 w-[140px] h-[44px]  rounded-3xl border border-rose-400 absolute bottom-[-18px] left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
              <g fill="#C73B0F" clip-path="url(#a)">
                <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
                <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M.333 0h20v20h-20z"/>
                </clipPath>
              </defs>
            </svg>
            Add to Cart
          </button>
        </picture>
        <div class="mt-8">
          <p class="text-rose-500">${dessert.category}</p>
          <h3>${dessert.name}</h3>
          <p class="text-red">$${dessert.price}</p>
        </div>
      `;
      container.appendChild(card);

      // Add decrement or increment in button when adding add to cart
      const addToCartButton = card.querySelector(".add-to-cart");
      const productImage = card.querySelector(".product-image");
      const cartTotalItems = document.getElementById("cart-total-items");
      let numberItemsInCart = 0;

      addToCartButton.addEventListener(
        "click",
        () => {
          numberItemsInCart++;
          console.log("Number of items in cart:", numberItemsInCart);
          addToCartButton.classList.add("bg-red", "static", "text-white");
          addToCartButton.innerHTML = `
          <div class="flex justify-between w-full">
            <div class="rounded-full border flex justify-center items-center p-1 py-1 negative-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
            </div>
            <p class="item-count">${numberItemsInCart}</p>
            <div class="rounded-full border flex justify-center items-center p-1 py-1 positive-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
            </div>
          </div>`;
          productImage.classList.add("border-2", "border-red");

          // add product to cart (in cart section)
          const cartItem = document.getElementById("cart-item");
          const existingCartItem = cartItem.querySelector(
            `[data-id="${dessert.id}"]`
          );
          const cartEmpty = document.getElementById("empty-cart");
          cartEmpty.style.display = "none";

          if (existingCartItem) {
            const itemCount = existingCartItem.querySelector(".item-count");
            itemCount.textContent = `${numberItemsInCart}x`;
          } else {
            const newCartItem = document.createElement("div");
            newCartItem.setAttribute("data-id", dessert.id);
            newCartItem.innerHTML = `<div class="flex border-b border-rose-100 py-4">
                                        <div class="w-full">
                                          <h3>${dessert.name}</h3>
                                            <div class="">
                                              <div class="flex gap-3">
                                              </span>
                                              <span class="item-count text-red">${numberItemsInCart}x
                                              </span>
                                              <span class="item-price text-rose-500"></span>@ $${
                                                dessert.price
                                              }
                                              <span class="item-total-price text-rose-500 font-semibold">$${
                                                numberItemsInCart *
                                                dessert.price
                                              }</span>
                                              </div>
                                            </div>
                                        </div>
                                        <div class="flex justify-center items-center hover:cursor-pointer">
                                          <div class="border flex justify-center items-center align-middle border-rose-300 rounded-full h-4 w-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                                          </div>
                                        </div>
                                    </div>`;
            cartItem.appendChild(newCartItem);
          }

          // Add event listener to the negative button
          const negativeButton =
            addToCartButton.querySelector(".negative-button");
          const itemCount = addToCartButton.querySelector(".item-count");

          negativeButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent triggering the addToCartButton click event
            if (numberItemsInCart > 0) {
              numberItemsInCart--;
              itemCount.textContent = numberItemsInCart;
              console.log("Number of items in cart:", numberItemsInCart);
            }
          });
        },
        { once: false }
      );
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
