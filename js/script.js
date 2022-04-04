function re_allign() {
    if (document.documentElement.scrollHeight <= window.innerHeight) {
        footer.style.overflow = "hidden";
        footer.style.position = "fixed";
        footer.style.width = "100%";
        footer.style.bottom = "0";
    } else {
        footer.style.position = "static";
    }
};


function toggle_active(e, reset){
    $(".shop")[0].style.display = "none";
    $(".about")[0].style.display = "none";
    $(".basket")[0].style.display = "none";
    if ($(e)[0].id == "about")
        $("#footer")[0].style.display = "none";
    else
        $("#footer")[0].style.display = "block";
    var togg = $(e).attr('id');
    $("."+togg)[0].style.display = "block";
    re_allign();
    $('.active').each(function(){$(this).removeClass("active");$(this)[0].style.color = "rgba(255,255,255,.5)";$(this)[0].style.display = "inline-block !important";});
    $(e).addClass("active");
    $(e)[0].style.color = "#fff";
    $("#search_query")[0].value = "";
    if (reset)
        search();
}


function list_shop(){
    var group = "";
    for(i=1;i<10;i++){
        var current_object = window["product" +i];
        group += `
            <div id="product`+current_object.getId()+`" class="card" onclick="on(`+i+`)">
                <img src="./img/prod`+current_object.getId()+`.jpg" class="card-img-top" alt="`+current_object.getName()+`">
                <div class="card-body">
                    <h5 class="card-title">`+current_object.getName()+`</h5>
                    <p class="card-text">`+current_object.getDescription()+`</p>
                </div>
            </div>`;
        if (i%3 == 0){
            group += "<div class='clear'></div>";
        }
    }
    $(".shop .holder").html(group);
    $(".shop")[0].style.display = "block";
    $(".about")[0].style.display = "none";
    $(".basket")[0].style.display = "none";
}


function search(query){
    list_shop();
    query = $("#search_query")[0].value.toLowerCase();
    $('.card').each(function(){
        str = $(this)[0].innerText.toLowerCase();
        if (str.search(query) == -1){
            $(this)[0].style.display = "none";
        }else {
            $(this)[0].style.display = "block";
        }  
    });
    re_allign();
    $("#shop")[0].style.color = "#fff";
    $("#shop").addClass("active");
    $("#about")[0].style.color = "rgba(255,255,255,.5)";
    $("#about").removeClass("active");
}


function on(i) {
    var current_object = window["product" +i];
    var box = document.getElementsByClassName("overlay")[0];
    box.style.display = "block";
    $('.overlay').each(function(){$(this)[0].style.display = "block";});
    box.innerHTML = `
    <div class="box" onclick="">
        <p>Title: `+current_object.getName()+`</p>
        <p>Description: `+current_object.getDescription()+`</p>
        <p>Price: `+current_object.getPrice()+`</p>
        <p>Count: `+current_object.getCount()+`</p>
        <p>Seller: `+obj.sellers[current_object.getSeller()-1].name+`</p>
        <p>Seller info: `+obj.sellers[current_object.getSeller()-1].description+`</p>
        <p>Seller products: `+obj.sellers[current_object.getSeller()-1].products+`</p>
    </div>
    `
    var next_i = 'on(' + (i+1) +")";
    var prev_i = 'on(' + (i-1) +")";
    if (i-1<1)
        $("#prev").attr("disabled", "true");
    else
        $("#prev").attr("onclick", prev_i);
    if (i+1>9)
        $("#next").attr("disabled", "true");
    else
        $("#next").attr("onclick", next_i);

    if (in_basket.includes(i)){
        $("#check").html("Remove from basket");
        $("#check").attr("onclick", "basket("+i+", 0)");
    }else{
        $("#check").html("Add to basket");
        $("#check").attr("onclick", "basket("+i+", 1)");
    }
}

function off() {
    $('.overlay').each(function(){$(this)[0].style.display = "none";});
}


function basket(id, add){
    if (add){
        in_basket.push(id);
        parent.window['product'+id].setClients(1);
    }else{
        in_basket.splice(in_basket.indexOf(id), 1);
        parent.window['product'+id].setClients(-1);
    }
    on(id);
    document.cookie = "basket=" + JSON.stringify(in_basket);
    localStorage.setItem("basket", JSON.stringify(in_basket)); // because chrome won't assing cookies to non-domain (file://), and yeah it's not secure
    list_basket();
}

function list_basket(){
    var basket = localStorage.getItem("basket");
    in_basket = JSON.parse(basket);
    var group = "";
    var total = 0;
    for(i=0;i<in_basket.length;i++){
        var current_object = window["product" + in_basket[i]];
        total += parseInt(current_object.getPrice());
        group += `
            <div id="product`+current_object.getId()+`" class="card" onclick="on(`+in_basket[i]+`)">
                <img src="./img/prod`+current_object.getId()+`.jpg" class="card-img-top" alt="`+current_object.getName()+`">
                <div class="card-body">
                    <h5 class="card-title">`+current_object.getName()+`</h5>
                    <p class="card-text">`+current_object.getDescription()+"<br>"+current_object.getPrice()+`</p>
                </div>
            </div>`;
        if (i%3 == 0){
            group += "<div class='clear'></div>";
        }
    }
    if (group == "")
        $(".basket .holder").html("<p class='center'>Once you add a product to the basket it will be here.</p>");
    else
        $(".basket .holder").html(group + "<p class='center'>Total price: "+total+"$ </p>");
    re_allign();
}


$(document).ready(function() {
    var footer = document.getElementById('footer');
    create_objects();
    list_shop();
    re_allign();
    console.clear();
});