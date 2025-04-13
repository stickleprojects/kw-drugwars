import { MatchAlgo } from "./MatchAlgo";
import { Product } from "./Product";
import { BuyOrder, SellOrder } from "./models/Order";
import { Price } from "./models/Price";
import { Trade } from "./models/Trade";

export class Market {
  private _trades: Trade[] = [];
  private _buyOrders: Map<Product, BuyOrder[]> = new Map<Product, BuyOrder[]>();
  private _sellOrders: Map<Product, SellOrder[]> = new Map<
    Product,
    SellOrder[]
  >();

  private _prices: Map<Product, Price> = new Map<Product, Price>();

  getPrice(product: Product): Price | null {
    if (!this._prices.has(product)) return null;
    return this._prices.get(product);
  }

  addBuy(order: BuyOrder) {
    if (!this._buyOrders.has(order.product)) {
      this._buyOrders.set(order.product, []);
    }
    this._buyOrders.get(order.product).push(order);
  }
  addSell(order: SellOrder) {
    if (!this._sellOrders.has(order.product)) {
      this._sellOrders.set(order.product, []);
    }
    this._sellOrders.get(order.product).push(order);
  }

  getTrades(
    buys: BuyOrder[],
    sales: SellOrder[],
    m: MatchAlgo,
    price: Price
  ): Trade[] {
    let trades = [];

    sales.forEach((s) => {
      // find a matching buy

      let buyorder = this.findMatchingBuy(s, buys, m);
      if (buyorder != null) {
        trades.push(new Trade(buyorder, s, price));
      }
    });

    return trades;
  }
  /**
   * Match buys to sells
   */
  match() {
    // foreach sell
    this._sellOrders.keys().forEach((p) => {
      const sales = this._sellOrders.get(p);
      const matchAlgo = new AllOrNone();

      const newSales = [];

      const price = this.getPrice(p);
      if (this._buyOrders.has(p)) {
        const buys = this._buyOrders.get(p);

        const trades = this.getTrades(buys, sales, matchAlgo, price);

        // we have a list of trades, update the prices
        const newSales = trades.map((t) => {
          const newOrder = t.SellOrder.Buy(t.BuyOrder);
          if (!newOrder.IsComplete()) {
            return newOrder;
          }
        });
        this._trades.push(...trades);
      }
      this._sellOrders.set(p, newSales);
    });
  }

  findMatchingBuy(
    s: SellOrder,
    buys: BuyOrder[],
    matchAlgo: MatchAlgo
  ): BuyOrder | null {
    return buys.find((b) => matchAlgo.Match(s, b));
  }
}
