var data_json =
'{ "products" : [' +
'{ "id":1 , "name":"Flash Memory", "description":"SanDisk 64GB Flash Memory", "price": "10$", "count":10, "seller_id": 1},' +
'{ "id":2 , "name":"External Hard Disk", "description":"1 Tera Hard disk", "price": "20$", "count":5, "seller_id": 2},' +
'{ "id":3 , "name":"Power Bank", "description":"20,000 mah with two sockets", "price": "30$", "count":7, "seller_id": 1},' +
'{ "id":4 , "name":"Wireless Adapter", "description":"USB wlan adapter", "price": "40$", "count":4, "seller_id": 2},' +
'{ "id":5 , "name":"Wi-Fi Jammer", "description":"Jamming wireless signals", "price": "50$", "count":1, "seller_id": 1},' +
'{ "id":6 , "name":"Wireless Repeater", "description":"Strengthing wireless signals", "price": "10$", "count":3, "seller_id": 2},' +
'{ "id":7 , "name":"Raspberry PI", "description":"Micro computer board", "price": "70$", "count":2, "seller_id": 1},' +
'{ "id":8 , "name":"Arduino", "description":"Micro controller board", "price": "80$", "count":2, "seller_id": 2},' +
'{ "id":9 , "name":"beaglebone", "description":"low-power open-source single-board computer", "price": "90$","count":1, "seller_id": 1}],' +
' "sellers" : [' +
'{ "id":1 , "name":"tamer", "description":"5-star egyptian seller", "products": 5},' +
'{ "id":2 , "name":"mounir", "description":"4-star egyptian seller", "products": 5}' +
']}';



class seller {
    constructor(id) {
        this.s_id = id;
        this.s_name = obj.sellers[id-1].name;
        this.s_description = obj.sellers[id-1].description;
        this.s_products = obj.sellers[id-1].products;
        this.s_clients = 0;
    }
    getId() {return this.id;}
    setId(id) {this.s_id = id;}

    getName() {return this.s_name;}
    setName(name) {this.s_name = name;}

    getDescription() {return this.s_description;}
    setDescription(description) {this.s_description = description;}

    getProducts() {return this.s_products;}
    setProducts(products) {this.s_products = products;}

    getClients() {return this.s_clients;}
    setClients(n) {
        this.s_clients += n;
        console.log('New message for seller '+this.s_name+', the product '+this.name+' is getting interactions. \n all clients for this item: ' + this.s_clients);
    }
}


class product extends seller{
    constructor(id, name, description, price, count, seller) {
        super(seller);
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.count = count;
        this.seller = seller;
    }
    getId() {return this.id;}
    setId(id) {this.id = id;}

    getName() {return this.name;}
    setName(name) {this.name = name;}

    getDescription() {return this.description;}
    setDescription(description) {this.description = description;}

    getPrice() {return this.price;}
    setPrice(price) {this.price = price;}

    getCount() {return this.count;}
    setCount(count) {this.count = count;}
    
    getSeller() {return this.seller}
    setSeller(seller) {this.seller = seller;}
}



var obj = JSON.parse(data_json);
function create_objects(){
    for (i=0;i<obj.products.length;i++){
        window["product" + obj.products[i].id] = new product(obj.products[i].id, obj.products[i].name, obj.products[i].description, obj.products[i].price, obj.products[i].count, obj.products[i].seller_id);
    }
}

var in_basket = [];