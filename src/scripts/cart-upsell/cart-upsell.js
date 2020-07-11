import GoCart from "@bornfight/gocart";
import "./cart-upsell.scss";

class CartUpsell {
  constructor(goCart) {
    this.goCart = goCart;
    this.cartOverlay = document.querySelector(".go-cart__overlay");
    this.cartFooter = document.querySelector(".go-cart-drawer__footer");
    this.setMutationObserverForCart();

  }

  setMutationObserverForCart() {  
    const mutationObserver = new MutationObserver(
      this.listenForCartMutation.bind(this)
    );

    mutationObserver.observe(this.cartOverlay, {
      attributes: true,
    });
  }

  listenForCartMutation(mutationsList, observer) {
    const opened = this.isCartOpened(this.cartOverlay);
    const rootEl = this.generateRootElement();
    this.addRootElToCart(rootEl);

    if (opened) {
      this.getDiscountedProduct((product, discount) => {
        this.generateProductForm(product, discount, rootEl);
        this.setEventListenerForAddToCartButtons();
      });
    } else {
      rootEl.remove();
    }
  }

  setEventListenerForAddToCartButtons() {
    this.goCart.addToCart = document.querySelectorAll('.js-go-cart-add-to-cart');
    this.goCart.addToCart.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        const formID = item.parentNode.getAttribute('id');
        this.goCart.addItemToCart(formID);
      });
    });
  }

  isCartOpened(cart) {
    const opened = cart.classList.contains("is-open");
    return opened;
  }

  isInHandlesArray(handle, item_handles, discounted_handles) {
    return item_handles.includes(handle) || discounted_handles.includes(handle);
  }

  generateRootElement() {
    const previousRoot = document.querySelector(".cart-upsell");
    previousRoot ? previousRoot.remove() : null;

    const root = document.createElement("div");
    root.classList.add("cart-upsell");

    return root;
  }

  addRootElToCart(rootEl) {
    this.cartFooter.prepend(rootEl);
  }

  getDiscountedProduct(callback) {
    const cartContents = fetch("/cart.js")
      .then((response) => response.json())
      .then((data) => {
        const item_handles = [];
        const items = data.items;
        items.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        for (let i = 0; i < items.length; i++) {
          item_handles.push(items[i].handle);
        }

        return item_handles;
      })
      .then((item_handles) => {
        if (item_handles.length) {
          const discounted_handles = [];
          let isFormExists = false;
          for (let i = 0; i < item_handles.length; i++) {
            const products = fetch(`/products/${item_handles[i]}.js`)
              .then((response) => response.json())
              .then((product) => {
                const tags = product.tags;
                if (tags.length) {
                  for (let i = 0; i < tags.length; i++) {
                    if (tags[i].includes("discount")) {
                      const tags_special = tags[i].split("/");
                      const discount = tags_special[0];
                      const handle = tags_special[1];
                      const discount_percent = tags_special[2];

                      const shouldntParse = this.isInHandlesArray(
                        handle,
                        item_handles,
                        discounted_handles
                      );

                      discounted_handles.push(handle);

                      if (shouldntParse) {
                        continue;
                      }

                      if (!isFormExists) {
                        fetch(`/products/${handle}.js`)
                          .then((response) => response.json())
                          .then((discounted_product) => {
                            callback(discounted_product, discount_percent);
                          });
                      }

                      isFormExists = true;
                    }
                  }
                }
              });
          }
        }
      });
  }

  generateProductForm(product, discount, rootEl) {
    console.log(product, discount);
    const form = `
      <form action="/cart/add" method="post" class="cart-upsell__form" enctype="multipart/form-data" 
        id="add-to-cart-${product.handle}">
        <select name="id" id="ProductSelect-${
          product.id
        }" class="product-single__variants">
          ${product.variants.map((variant) => {
            if (variant.available) {
              return `<option 
                  data-sku=${variant.sku} 
                  value="${variant.id}">${variant.title} - ${variant.price}
                </option>`;
            } else {
              return `
                <option disabled="disabled">
                  ${variant.title} - ${variant.price}
                </option>
                `;
            }
          })}
        </select>  
        <button  
          type="submit" 
          name="add" 
          data-add-to-cart
          class="js-go-cart-add-to-cart"
          >buy
        </button>
      </form>
    `;
    const form_node = document.createElement("div");
    form_node.innerHTML = form;
    rootEl.append(form_node);
    return form_node;
  }
}

export default CartUpsell;
