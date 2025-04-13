import { Product } from "@/Product";

export class Price {
  product: Product;
  amount: number;
  constructor(p: Product, amount: number) {
    this.product = p;
    this.amount = amount;
  }
}
