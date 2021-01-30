module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty ||0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item,id,Quantity){
        var storedItem = this.items[id];
        if (!storedItem){
            storedItem = this.items[id] = {item:item, qty:0, price:0}
        }
        storedItem.qty = storedItem.qty+parseInt(Quantity);
        storedItem.price = storedItem.item.productPrice * storedItem.qty;
        this.totalQty++;
        this.totalPrice += parseFloat(storedItem.item.productPrice);
    }

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };


};