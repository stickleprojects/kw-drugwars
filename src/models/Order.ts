import { Product } from "@/Product";

class Order {
  product: Product;
  howMany: number;
  minPrice: number;
  maxPrice: number;

  constructor(
    product: Product,
    howmany: number,
    minprice: number,
    maxprice: number
  ) {
    this.product = product;
    this.howMany = howmany;
    this.minPrice = minprice;
    this.maxPrice = maxprice;
  }

  IsComplete() {
    return this.howMany <= 0;
  }
}

export class BuyOrder extends Order {}
export class SellOrder extends Order {
  Buy(buyorder: BuyOrder): SellOrder {
    if (buyorder.product != this.product) throw "Invalid Product";

    const remainder = this.howMany - buyorder.howMany;

    const ret = new SellOrder(
      this.product,
      remainder,
      this.minPrice,
      this.maxPrice
    );

    return ret;
  }
}
