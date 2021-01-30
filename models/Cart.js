module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty ||0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item,id,Quantity){
        var storedItem = this.items[id];
        if (!storedItem){
            storedItem = this.items[id] = {item:item, qty:0, price:0}
            this.totalQty++;
        }
        storedItem.qty = parseFloat(Quantity);
        storedItem.price = storedItem.item.productPrice * storedItem.qty;
        this.totalPrice += parseFloat(storedItem.item.productPrice)*storedItem.qty;
    }

    this.edit = function (item,id,Quantity){
        var storedItem = this.items[id];
        if (!storedItem){
            storedItem = this.items[id] = {item:item, qty:0, price:0}
        }
        
        this.totalPrice -= storedItem.price;
        storedItem.qty = parseFloat(Quantity);
        storedItem.price = storedItem.item.productPrice * storedItem.qty;
        this.totalPrice += parseFloat(storedItem.item.productPrice)*storedItem.qty;
    }

    this.remove = function (id){
        var storedItem = this.items[id];
        this.totalPrice -= storedItem.price;
        this.totalQty--;
        delete this.items[id];
    }

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };


};