import GoCart from '@bornfight/gocart';
import './cart-upsell.scss';

const cartUpsell = () => {
  var CART_OVERLAY = document.querySelector(".go-cart__overlay");
  var CART_FOOTER = document.querySelector(".go-cart-drawer__footer");

  (function setMutationObserverForCart() {
    const mutationObserver = new MutationObserver(watchForCartClassMutation);

    mutationObserver.observe(document.querySelector(".go-cart__overlay"), {
      attributes: true,
    });
  })();

  function isCartOpened(cart_overlay) {
    const opened = cart_overlay.classList.contains("is-open");
    return opened;
  }

  function generateRootElement() {
    var previousRoot = document.querySelector(".cart-upsell");
    previousRoot ? previousRoot.remove() : null;

    var root = document.createElement("div");
    root.classList.add("cart-upsell");

    return root;
  }

  function addRootElToCart(rootEl) {
    CART_FOOTER.prepend(rootEl);
  }

  function isInHandlesArray(handle, item_handles, discounted_handles) {
    return item_handles.includes(handle) || discounted_handles.includes(handle);
  }

  function getDiscountedProduct(callback) {
    var cartContents = fetch("/cart.js")
      .then((response) => response.json())
      .then((data) => {
        var item_handles = [];
        var items = data.items;
        for (let i = 0; i < items.length; i++) {
          item_handles.push(items[i].handle);
        }

        return item_handles;
      })
      .then((item_handles) => {
        if (item_handles.length) {
          var discounted_handles = [];
          for (let i = 0; i < item_handles.length; i++) {
            var products = fetch(`/products/${item_handles[i]}.js`)
              .then((response) => response.json())
              .then((product) => {
                var tags = product.tags;
                if (tags.length) {
                  for (let i = 0; i < tags.length; i++) {
                    if (tags[i].includes("discount")) {
                      var tags_special = tags[i].split("/");
                      var discount = tags_special[0];
                      var handle = tags_special[1];
                      var discount_percent = tags_special[2];

                      var shouldntParse = isInHandlesArray(
                        handle,
                        item_handles,
                        discounted_handles
                      );

                      discounted_handles.push(handle);

                      if (shouldntParse) {
                        continue;
                      }

                      fetch(`/products/${handle}.js`)
                        .then((response) => response.json())
                        .then((discounted_product) => {
                          callback(discounted_product, discount_percent);
                        });
                    }
                  }
                }
              });
          }
        }
      });
  }

  function generateProductForm(product, discount) {
    console.log(product, discount);
    const form = `
      <form action="/cart/add" method="post" enctype="multipart/form-data" 
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
    var form_node = document.createElement("div");
    form_node.innerHTML = form;
    return form_node;
  }

  function watchForCartClassMutation(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        var opened = isCartOpened(CART_OVERLAY);
        var rootEl = generateRootElement();
        addRootElToCart(rootEl);

        if (opened) {
          getDiscountedProduct(function (product, discount) {
            var product_form = generateProductForm(product, discount);
            rootEl.append(product_form);
            const goCart = new GoCart({
              cartMode: "drawer", //drawer or mini-cart
              drawerDirection: "right", //cart drawer from left or right
              displayModal: false, //display success modal when adding product to cart
              moneyFormat: "${{amount}}", //template for money format when displaying money
            });
          });
        } else {
          rootEl.remove();
        }
      }
    });
  }
};

export default cartUpsell;
