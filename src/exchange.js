
export default function () {

    const products = [];

    const _buyOrders = [];
    const _sellOrders = [];


    function Match() {

    }
    function createOrder(buyer, productid, quantity, price) {
        return {
            buyer: buyer,
            produtid: productid,
            quantity: quantity,
            price: price
        }
    }
    function Buy(buyer, productid, quantity, price) {

        // post the order
        _buyOrders.push(createOrder(buyer, productid, quantity, price));

    }

    function Sell(seller, productid, quantity, price) {
        // post the order
        _sellOrders.push(createOrder(buyer, productid, quantity, price));

    }

}