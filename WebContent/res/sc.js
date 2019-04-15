function toShoppingCart(address){
	var request = new XMLHttpRequest();

	request.open("GET", (address + "?quantity=true"), true);
	request.onreadystatechange = function(){
		quantityHandler(request);
	}
	request.send();
}

function quantityHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		var plist = document.getElementById("books");
		var responseArray = request.responseText;
		responseArray = responseArray.substring(1, responseArray.length - 1);

		if (responseArray != ""){
			plist.innerHTML = "";
			var elements = responseArray.split(',');


			for (var qty in elements){
				var toBeUsed = elements[qty].trim();
				toBeUsed = toBeUsed.substring(1, toBeUsed.length - 1);
				var info = toBeUsed.split('|');
				var newqty = +qty + +1;
				
				
				plist.innerHTML += '<li> <div class="main"><div class="title">' + info[0].trim() + '</div><div class="image">' 
					+ '<img src="res/images/book1.png" height="100%" width="100%"></div><div class="price">$' + info[2].trim() + '</div>'
					+ '<div class="clicker"><div class="add" onclick="inc(' + newqty + ", " + info[2].trim() + ')">+</div><div class="counter"'
					+ 'id="prod' + newqty + '">' + info[1].trim() + '</div><div class="remove" onclick="dec(' + newqty + ", " + info[2].trim() + ')">-</div>'
					+ '</div></div></li>';
				
				
				var price = (parseFloat(info[2].trim()) * parseFloat(info[1].trim()));
				var roundedPrice = Math.round(parseFloat((price * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2);


				calculateTotal('inc', roundedPrice);

			}

		}

	}
}

function dec(element, cost){
	
	
	var qty = document.getElementById("prod" + element);
	var val = qty.innerHTML;
	
	
	if ((+val - +1) >= 0){
		
		qty.innerHTML = +val - +1;
		
		calculateTotal('dec', cost);
	} 

}

function inc(element, cost){
	var qty = document.getElementById("prod" + element);
	var val = qty.innerHTML;
	
	qty.innerHTML = +val + +1;
	
	calculateTotal('inc', cost);
}

function calculateTotal(func, cost){
	
	var target = document.getElementById("totalPrice");
	var curPrice;
	var targetText = target.innerHTML;

	if (targetText == ""){
		curPrice = 0;
	}else{
		curPrice = targetText.substring(1,targetText.length);
	}

	if (func == "inc"){
		var price = +curPrice + +cost;
		var roundedPrice = Math.round(parseFloat((price * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2);
	}else if (func == "dec"){
		var price = +curPrice - +cost;
		var roundedPrice = Math.round(parseFloat((price * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2);
	}


	target.innerHTML = "$" + Math.max(roundedPrice, 0);

}