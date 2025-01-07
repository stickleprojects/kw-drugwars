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

    sellProduct(user, city, productId, quantity) {
      const userItemIndex = user.products.findIndex(
        (x) => x.id == productId
      );
      var userItem = user.products[userItemIndex];

      if (!userItem) {
        console.error("You cant sell that product, you dont have any!");
        return
      }
      if (quantity > userItem.quantity) {
        alert("You cant sell that many, you onlly have " + userItem.quantity);
        return

      }
      const cityItemIndex = city.products.findIndex(x => x.id === productId);
      const cityItem = city.products[cityItemIndex];

      if (!cityItem) {
        alert("You cannot sell that product in that city");
        return;
      }

      const total = cityItem.price * quantity;

      userItem.quantity -= quantity;
      user.balance = round(user.balance + total, 2);
      cityItem.quantity += quantity;

      // update user inventory
      city.products = [...city.products.filter(x => x.id !== productId), cityItem];
      user.products = [...user.products.filter(x => x.id !== productId), userItem];

    },
    buyProduct(user, city, productId, quantity) {
      const cityItemIndex = city.products.findIndex(x => x.id === productId);
      const cityItem = city.products[cityItemIndex];

      if (!cityItem) {
        alert("You cannot buy that product in that city");
        return;
      }

      const userItemIndex = user.products.findIndex(
        (x) => x.id == productId
      );
      var userItem = user.products[userItemIndex];

      if (!userItem) {
        userItem = { id: productId, quantity: 0, name: cityItem.name };
      }

      if (quantity > cityItem.quantity) {
        alert("You cant buy that many, the max is " + cityItem.quantity);
        return

      }

      const total = cityItem.price * quantity;

      if (total > user.balance) {
        alert("You cant afford that many, you only have " + user.balance);
        return;
      }

      userItem.quantity += quantity;
      user.balance = round(user.balance - total, 2);
      cityItem.quantity += quantity;

      // update user inventory
      city.products = [...city.products.filter(x => x.id !== productId), cityItem];
      user.products = [...user.products.filter(x => x.id !== productId), userItem];

    },

  },
});
