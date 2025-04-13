import { Product } from "@/Product";
import { BuyOrder, SellOrder } from "./Order";
import { Price } from "./Price";

export class Trade {
  private _buyOrder: BuyOrder;
  public get BuyOrder(): BuyOrder {
    return this._buyOrder;
  }

  _sellOrder: SellOrder;
  public get SellOrder(): SellOrder {
    return this._sellOrder;
  }

  private _price: Price;
  public get Price(): Price {
    return this._price;
  }
  constructor(b: BuyOrder, s: SellOrder, price: Price) {
    this._buyOrder = b;
    this._sellOrder = s;
  }
}
