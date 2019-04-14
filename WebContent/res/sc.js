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
		var table = document.getElementById("scTable");
		var responseArray = request.responseText;
			responseArray = responseArray.substring(1, responseArray.length - 1);
			
		if (responseArray != ""){
			var elements = responseArray.split(',');

			var row = table.insertRow(0);
			row.insertCell(0).innerHTML = "<b>Title</b>";
			row.insertCell(1).innerHTML = "";
			row.insertCell(2).innerHTML = "<b>Quantity</b>";
			row.insertCell(3).innerHTML = "";
			row.insertCell(4).innerHTML = "<b>Price</b>";

			for (var qty in elements){
				var toBeUsed = elements[qty].trim();
				toBeUsed = toBeUsed.substring(1, toBeUsed.length - 1);
				var info = toBeUsed.split('|');
				var row = table.insertRow(+qty + +1);
				row.insertCell(0).innerHTML = info[0].trim();
				row.insertCell(1).innerHTML = "<button type='button' name='qtyDec' label='qtyDec'	class='qty' " +
				"onclick='dec(" + (+qty + +1) + ", " + info[2].trim() + ")'>-</button>";
				row.insertCell(2).innerHTML = info[1].trim();
				row.insertCell(3).innerHTML = "<button type='button' name='qtyInc' label='qtyInc'	class='qty' " +
				"onclick='inc(" + (+qty + +1) + ", " + info[2].trim() + ")'>+</button>";
				var price = (parseFloat(info[2].trim()) * parseFloat(info[1].trim()));
				var roundedPrice = Math.round(parseFloat((price * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2);
				row.insertCell(4).innerHTML = "$" + roundedPrice;

				calculateTotal('inc', roundedPrice);

			}
			for(var i = 1; i < 9; i++){
				row = table.insertRow(i +elements.length);
				row.insertCell(0).innerHTML = "";
				row.insertCell(1).innerHTML = "";
				row.insertCell(2).innerHTML = "";
				row.insertCell(3).innerHTML = "";
				row.insertCell(4).innerHTML = "";
			}

		}

	}
}

function dec(row, cost){
	var table = document.getElementById("scTable");
	var qty = table.rows[row].cells[2].innerHTML;
	console.log(+qty - +1);
	if ((+qty - +1) >= 0){
		table.rows[row].cells[2].innerHTML = +qty - +1;
		var newPrice = (+qty - +1)*parseFloat(cost);
		var roundedPrice = Math.round(parseFloat((newPrice * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2);
		table.rows[row].cells[4].innerHTML = "$" + roundedPrice;	

		calculateTotal('dec', cost);
	} 

}

function inc(row, cost){
	var table = document.getElementById("scTable");
	var qty = table.rows[row].cells[2].innerHTML;
	table.rows[row].cells[2].innerHTML = +qty + +1;
	var newPrice = (+qty + +1)*parseFloat(cost);
	var roundedPrice = Math.round(parseFloat((newPrice * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2);
	table.rows[row].cells[4].innerHTML = "$" + roundedPrice;	


	calculateTotal('inc', cost);
}

function calculateTotal(func, cost){
	var table = document.getElementById("scTable");
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