

export default marketSim(productName, city) {

  const productInfo = city.products.find(x => x.name === productName);
  const demand = 15;

  const available = productInfo.quantity;

  let increaseBasedOnDemand = 1;

  if (demand > available) {
    // push up the price
    increaseBasedOnDemand = 1
  } else {
    // the price should drop
    increaseBasedOnDemand = -1
  }
  // if recent trades are increasing the quantity
  const trend = getProductTrend(productInfo);

  // price is going up
  if (trend.price > 1) {

  }
}

function getProductTrend(exchange, productInfo) {
  const trades = exchange.getTradesForProduct(productInfo);

  const firstTrade = trades[0];
  const lastTrade = trades[trades.length - 1];

  trand = {
    quantity: lastTrade.quantity / firstTrade.quantity,
    price: lastTrade.price / firstTrade.price;
  }
  return trend;
}



}