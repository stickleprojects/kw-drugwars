import cityDataJSON from "../docs/citiesAndRuotes.json";

export function DataGenerator() {

    const cityData = JSON.parse(cityDataJSON);

    // generate the routes between cities, assume you can go from anywhere to anywhere
    const routes = getRoutes(cityData);
}

function getRoutes(cityData) {


    cityData.cities.keys().map(cd => {
        const cityInfo = cityData.cities[cd];

    })
}