import GoCart from '@bornfight/gocart';
import CartUpsell from "./cart-upsell/cart-upsell";
import './go-cart/go-cart.scss';

const goCart = new GoCart({
  cartMode: 'drawer', //drawer or mini-cart  
  drawerDirection: 'right', //cart drawer from left or right
  displayModal: false, //display success modal when adding product to cart
  moneyFormat: '${{amount}}', //template for money format when displaying money
});

const cartUpsell = new CartUpsell();
