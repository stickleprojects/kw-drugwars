import { defineStore } from "pinia";

function round(num, decimalPlaces = 0) {
  var p = Math.pow(10, decimalPlaces);
  var n = num * p * (1 + Number.EPSILON);
  return Math.round(n) / p;
}

export const drugDataStore = defineStore("drugstore", {
  state: () => {
    return {
      user: {
        name: "kieron",
        balance: 284.34,
        currency: "GBP",
        products: [{ id: 1, name: "heroin", quantity: 23 }],
      },
      cities: [
        {
          name: "london",
          products: [{ id: 1, name: "heroin", price: 23.23, quantity: 23 }],
        },
        {
          name: "new york",
          products: [
            { id: 1, name: "heroin", price: 93.23, quantity: 33 },
            { id: 2, name: "coke", price: 113.23, quantity: 100 },
            { id: 3, name: "peanuts", price: 116.23, quantity: 100 },
          ],
        },
      ],
    };
  },
  actions: {
    canSell(user, productid) {
      var userItem = this.user.products.find((x) => x.id == productid);
      if (!userItem) {
        return false;
      }
      return true;
    },

    sellProduct(user, productId, qty, itemPrice) {
      if (!this.canSell(user, productId)) return false;

      const userItemIndex = this.user.products.findIndex(
        (x) => x.id == productId
      );
      var userItem = this.user.products[userItemIndex];

      if (qty > userItem.quantity) {
        alert(
          "thats too many, you only have " + userItem.quantity + " available!"
        );
        return;
      }
      const total = qty * itemPrice;

      this.user.balance = round(this.user.balance + total, 2);
      userItem.quantity -= qty;
      this.user.products.splice(userItemIndex, 1);

      if (userItem.quantity > 0) {
        this.user.products += userItem;
      }
      return true;
    },
    buyProduct(user, productId, qty, itemPrice) {
      const totalprice = qty * itemPrice;
      if (totalprice > user.balance) {
        console.log("you cant afford it");
        return false;
      }
      this.user.balance = round(this.user.balance - totalprice, 2);

      const userItemIndex = this.user.products.findIndex(
        (x) => x.id == productId
      );

      var userItem = this.user.products[userItemIndex];

      if (userItem) {
        this.user.products.splice(userItemIndex, 1);
        userItem.quantity += qty;
      } else {
        userItem = {
          id: productId,
          quantity: qty,
        };
      }
      this.user.products += userItem;

      return true;
    },
  },
});
