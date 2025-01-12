export default function GetMarketPrices() {
  const T = 0.5; // haf a year
  const delta_T = 1 / 252; // each day is 1/252 of a trading year
  const n = Math.round(T / delta_T, 0); // total numbe rof random samples

  const s0 = 20; // initial price of stock
  const mu = 1; // drift (how quicklythe price gains/loses value)
  const sigma = 1; // volatilitiy (how much it jumps around)

  const k = 1000; // the number of prices to generate
}

function simulatePrices(n, k, mu, sigma, delta_t) {
  const r = mu * delta_t + sigma * Math.sqrt(delta_t) * Math.random;
}

function normal(mu, sigma, nsamples) {
  if (!nsamples) nsamples = 6;
  if (!sigma) sigma = 1;
  if (!mu) mu = 0;

  var run_total = 0;
  for (var i = 0; i < nsamples; i++) {
    run_total += Math.random();
  }

  return (sigma * (run_total - nsamples / 2)) / (nsamples / 2) + mu;
}
