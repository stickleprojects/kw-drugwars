import { defineStore } from "pinia";
import { GenerateCityData } from "./datagenerator";

function round(num, decimalPlaces = 0) {
  var p = Math.pow(10, decimalPlaces);
  var n = num * p * (1 + Number.EPSILON);
  return Math.round(n) / p;
}

export const drugDataStore = defineStore("drugstore", {
  state: () => {
    const cityData = GenerateCityData();

    return {
      user: {
        name: "kieron",
        balance: 284.34,
        currency: "GBP",
        products: [],
        city: "london",
      },
      balance_data: [],
      cities: cityData.cities,
      // cities: [
      //   {
      //     name: "london",
      //     products: [{ id: 1, name: "heroin", price: 23.23, quantity: 23 }],
      //     destinations: [
      //       // cities you can go to
      //       { name: "new york", distance: 10 },
      //       { name: "paris", distance: 5 },
      //     ],
      //   },
      //   {
      //     name: "new york",
      //     products: [
      //       { id: 1, name: "heroin", price: 93.23, quantity: 33 },
      //       { id: 2, name: "coke", price: 113.23, quantity: 100 },
      //       { id: 3, name: "peanuts", price: 116.23, quantity: 100 },
      //     ],
      //     destinations: [
      //       // cities you can go to
      //       { name: "london", distance: 10 },
      //       { name: "paris", distance: 12 },
      //     ],
      //   },
      //   {
      //     name: "paris",
      //     products: [
      //       { id: 1, name: "heroin", price: 93.23, quantity: 33 },
      //       { id: 2, name: "coke", price: 113.23, quantity: 100 },
      //       { id: 3, name: "peanuts", price: 116.23, quantity: 100 },
      //     ],
      //     destinations: [
      //       // cities you can go to
      //       { name: "london", distance: 5 },
      //       { name: "new york", distance: 12 },
      //     ],
      //   },
      // ],
    };
  },
  actions: {
    tick(tickCount) {
      // records the current profits

      // debugger;  // eslint-disable-line no-debugger

      const newRecord = {
        username: this.user.name,
        timestamp: this.balance_data.length + 1,
        balance: this.user.balance,
      };
      this.balance_data.push(newRecord);

      // run tick engine
      if (!this.tickCount) tickCount = 1;

      for (var i = 0; i < tickCount; i++) {
        this.updatePrices();
      }
    },
    getNewProductPrice(product) {
      // pricing algo based on this article https://medium.com/@MachineLearningYearning/how-to-simulate-stock-prices-452042862989

      const currentPrice = product.price;

      const r1 = Math.random();
      const r2 = Math.random();

      // r2 greater so increase the price
      let newPrice;
      if (r2 > r1) {
        newPrice = currentPrice * (1 + r1);
      } else {
        newPrice = currentPrice * r1;
      }

      return round(newPrice, 2);
    },
    updatePrices() {
      this.cities.forEach((c) => {
        c.products.forEach((p) => {
          p.price = this.getNewProductPrice(p);
        });
      });
    },
    moveToCity(name) {
      if (name === this.user.city) {
        console.error("You are already in " + name);
        return false;
      }

      const src = this.cities.find((x) => x.name === this.user.city);

      // work out the distance
      const destination = src.destinations.find((x) => x.name === name);
      if (!destination) {
        console.error("You cannot go from " + this.user.city + " to " + name);
        return false;
      }

      const distance = destination.distance;

      // tick a few times
      this.tick(distance);

      this.user.city = destination.name;

      return true;
    },

    getDestinationsfromCurrentCity() {
      const currentCity = this.getCurrentCity();

      return currentCity.destinations;
    },
    canSell(user, productid) {
      var userItem = this.user.products.find((x) => x.id == productid);
      if (!userItem) {
        return false;
      }
      return true;
    },
    getCurrentCity() {
      const currentCity = this.cities.find((x) => x.name === this.user.city);
      return currentCity;
    },
    sellProduct(user, city, productId, quantity) {
      const userItemIndex = user.products.findIndex((x) => x.id == productId);
      var userItem = user.products[userItemIndex];

      if (!userItem) {
        console.error("You cant sell that product, you dont have any!");
        return;
      }
      if (quantity > userItem.quantity) {
        alert("You cant sell that many, you onlly have " + userItem.quantity);
        return;
      }
      const cityItemIndex = city.products.findIndex((x) => x.id === productId);
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
      city.products = [
        ...city.products.filter((x) => x.id !== productId),
        cityItem,
      ];
      user.products = [
        ...user.products.filter((x) => x.id !== productId),
        userItem,
      ];

      this.tick();
    },
    buyProduct(user, city, productId, quantity) {
      const cityItemIndex = city.products.findIndex((x) => x.id === productId);
      const cityItem = city.products[cityItemIndex];

      if (!cityItem) {
        alert("You cannot buy that product in that city");
        return;
      }

      const userItemIndex = user.products.findIndex((x) => x.id == productId);
      var userItem = user.products[userItemIndex];

      if (!userItem) {
        userItem = { id: productId, quantity: 0, name: cityItem.name };
      }

      if (quantity > cityItem.quantity) {
        alert("You cant buy that many, the max is " + cityItem.quantity);
        return;
      }

      const total = cityItem.price * quantity;

      if (total > user.balance) {
        alert("You cant afford that many, you only have " + user.balance);
        return;
      }

      userItem.quantity += quantity;
      user.balance = round(user.balance - total, 2);
      cityItem.quantity -= quantity;

      // update user inventory
      city.products = [
        ...city.products.filter((x) => x.id !== productId),
        cityItem,
      ];
      user.products = [
        ...user.products.filter((x) => x.id !== productId),
        userItem,
      ];

      this.tick();
    },
  },
});
