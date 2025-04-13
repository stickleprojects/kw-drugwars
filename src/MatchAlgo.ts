import { SellOrder, BuyOrder } from "./models/Order";

class MatchAlgo {
  Match(s: SellOrder, b: BuyOrder): boolean {
    return s.product === b.product;
  }
}

export class AllOrNone extends MatchAlgo {
  Match(s: SellOrder, b: BuyOrder): boolean {
    return super.Match(s, b) && b.howMany >= s.howMany;
  }
}
export class AtLeastOne extends MatchAlgo {
  Match(s: SellOrder, b: BuyOrder): boolean {
    return super.Match(s, b) && b.howMany > 0;
  }
}
