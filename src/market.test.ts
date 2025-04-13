import { test, describe, expect, it, beforeEach } from "vitest";
import { Market } from "./market";
import { Product } from "./Product";
import { BuyOrder, SellOrder } from "./models/Order";
import { AtLeastOne } from "./MatchAlgo";
import { Price } from "./models/Price";

describe("market tests", () => {
  let sut: Market;
  let product: Product;

  beforeEach(() => {
    // init the market sim
    sut = new Market();
    product = new Product();

    sut.addBuy(new BuyOrder(product, 5, 10.0, 20.0));
  });

  describe("match tests", () => {
    it("should match sale to buy for same product", () => {
      const sales = [new SellOrder(product, 5, 10.0, 20.0)];
      const buys = [new BuyOrder(product, 5, 10.0, 20.0)];
      const m = new AtLeastOne();
      const price = new Price(product, 15.0);

      let trades = sut.getTrades(buys, sales, m, price);
      expect(trades.length).toBeGreaterThan(0);
    });
  });
  it("should not be null", () => {
    expect(sut).not.toBeNull();
  });
});
