export function GenerateCityData() {
  const cities = ["london", "new york", "paris"];
  const edges = [
    { from: "london", to: "new york", distance: 15 },
    { from: "london", to: "paris", distance: 7 },
    { from: "paris", to: "new york", distance: 10 },
    { from: "paris", to: "london", distance: 7 },
    { from: "new york", to: "paris", distance: 10 },
    { from: "new york", to: "london", distance: 15 },
  ];
  const products = ["heroin", "coke", "weed", "shrooms", "garlic"];

  function productIsValidForCity(city, product) {
    if (city === "london") return true;

    if (
      city === "new york" &&
      ["shrooms", "weed", "heroin", "coke"].includes(product)
    ) {
      return true;
    }
    if (city === "paris" && ["shrooms", "coke", "garlic"].includes(product)) {
      return true;
    }
    return false;
  }

  let data = {
    cities: [],
  };
  cities.forEach((citydef) => {
    const cityName = citydef;

    const newCity = {
      name: cityName,
      destinations: edges
        .filter((e) => e.from === cityName)
        .map((e) => {
          return {
            name: e.to,
            distance: e.distance,
          };
        }),
      products: products
        .filter((p) => productIsValidForCity(citydef, p))
        .map((p) => {
          const price = 23;
          const quantity = 20;
          return {
            id: p,
            name: p,
            price: price,
            quantity: quantity,
          };
        }),
    };
    data.cities.push(newCity);
  });

  return data;
}
