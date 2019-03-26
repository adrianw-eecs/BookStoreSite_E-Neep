function validate(){
	var ok = true;
	var p = document.getElementById("principal").value;
	if (isNaN(p) || p <= 0){
		alert("Principal invalid!");
		document.getElementById("principalError").innerHTML = "Principal must be greater than 0!";
		ok = false;
	}
	if (!ok) {
		document.getElementById("interestError").innerHTML = "";
		document.getElementById("periodError").innerHTML = "";
		return false;
	}
	else document.getElementById("principalError").innerHTML = "";
	p = document.getElementById("interest").value;
	if (isNaN(p) || p <= 0 || p >= 100){
		alert("Interest invalid. Must be in [0,100].");
		document.getElementById("interestError").innerHTML = "Interest must be between 0 and 100!";
		ok = false;
	}
	if (!ok) {
		document.getElementById("periodError").innerHTML = "";
		return false;
	}
	else document.getElementById("interestError").innerHTML = "";
	p = document.getElementById("period").value;
	if (isNaN(p) || p <= 0){
		alert("Period invalid!");
		document.getElementById("periodError").innerHTML = "Period must be greater than 0!";
		ok = false;
	}
	if (ok) document.getElementById("periodError").innerHTML = "";
	return ok;
}



function populateAndShow(s1, s2, address){
	var l_s1 = document.getElementById(s1);
	var l_s2 = document.getElementById(s2);
	l_s2.innerHTML = "";
	//validate();
	document.getElementById(s2).hidden = false;
	document.getElementById("btable").style.display = "none";
	var request = new XMLHttpRequest();
	if(l_s1.value == "Science"){
		request.open("GET", (address + "?category=science"), true);
	}
	if(l_s1.value == "Fiction"){
		request.open("GET", (address + "?category=fiction"), true);
	}
	if(l_s1.value == "Engineering"){
		request.open("GET", (address + "?category=engineering"), true);
	}
	request.onreadystatechange = function() {
		dropDownHandler(request, l_s2);
	};
	request.send();

}

function dropDownHandler(request, target){
	if ((request.readyState == 4) && (request.status == 200)){
		var responseArray = request.responseText;
		responseArray = responseArray.substring(1, responseArray.length - 1);
		var elements = responseArray.split(',');
		var newOption = document.createElement('option');
		newOption.value="";
		newOption.innerHTML = "";
		target.options.add(newOption);
		for (var book in elements){
			var pair = elements[book].split('|');
			var newOption = document.createElement('option');
			newOption.value = pair[0].trim();
			newOption.innerHTML = pair[1].trim();
			target.options.add(newOption);
		}
	}
}

function createTableForBook(bookId, address){
	var id = document.getElementById(bookId);
	var request = new XMLHttpRequest();
	request.open("GET", (address + "?bid=" + id.value), true);
	request.onreadystatechange = function() {
		document.getElementById("btable").style.display = "";
		document.getElementById("bookResult").innerHTML = "";
		tableHandler(request);
	};
	request.send();
}

function tableHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		var responseInfo = request.responseText;
		var info = responseInfo.split('|');
		document.getElementById("bid").innerHTML = info[0];
		document.getElementById("btitle").innerHTML = info[1];
		document.getElementById("brating").innerHTML = info[2];
		document.getElementById("bprice").innerHTML = "$" + info[3];
	}
}

function addReview(address, bookId){
	var request = new XMLHttpRequest();
	var review = document.getElementById("bookReview").value;
	document.getElementById("bookReview").value = "";
	var bid = document.getElementById(bookId);
	if (review != ""){
		request.open("POST", (address + "?review=" + review + "&bid=" + bid.value), true);
		request.onreadystatechange = function(){
			reviewHandler(request);
		}
		request.send();
	}
}

function reviewHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		document.getElementById("bookResult").innerHTML = "Thank You or submitting a review!"; 
	}
}

function addToCart(address, bookId){
	var request = new XMLHttpRequest();
	var bid = document.getElementById(bookId);

	request.open("POST", (address + "?addBid=" + bid.value), true);
	request.onreadystatechange = function(){
		cartHandler(request);
	}
	request.send();
}

function cartHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		alert("added!"); 
	}
}

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
		for(var i = 1; i < 10; i++){
			row = table.insertRow(i +elements.length);
			row.insertCell(0).innerHTML = "";
			row.insertCell(1).innerHTML = "";
			row.insertCell(2).innerHTML = "";
			row.insertCell(3).innerHTML = "";
			row.insertCell(4).innerHTML = "";
		}

	}
}

function dec(row, cost){
	var table = document.getElementById("scTable");
	var qty = table.rows[row].cells[2].innerHTML;
	table.rows[row].cells[2].innerHTML = +qty - +1;
	var newPrice = (+qty - +1)*parseFloat(cost);
	var roundedPrice = Math.round(parseFloat((newPrice * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2);
	table.rows[row].cells[4].innerHTML = "$" + roundedPrice;	
	
	calculateTotal('dec', cost);

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

function login(address){
	document.getElementById("pTable").style.display = "";
	document.getElementById("infoTable").style.display = "none";
	document.getElementById("loginNow").hidden = false;
	document.getElementById("createNow").hidden = true;
}

function create(address){
	document.getElementById("pTable").style.display = "";
	document.getElementById("infoTable").style.display = "none";
	document.getElementById("loginNow").hidden = true;
	document.getElementById("createNow").hidden = false;
}

function login2(address){
	//validate();
	document.getElementById("infoTable").style.display = "";
	hideRest();
	hideCreateDisplay();
	document.getElementById("fnameLabel").innerHTML = "Steve";
	document.getElementById("lnameLabel").innerHTML = "Irwin";
	document.getElementById("streetNameLabel").innerHTML = "42 Wallaby Way";
	document.getElementById("provLabel").innerHTML = "Sydney";
	document.getElementById("ctLabel").innerHTML = "Australia";
	document.getElementById("zipLabel").innerHTML = "M3J 3S8";
	document.getElementById("phnLabel").innerHTML = "416-123-4567";
	
	document.getElementById("fnameLabel").hidden = false;
	document.getElementById("lnameLabel").hidden = false;
	document.getElementById("streetNameLabel").hidden = false;
	document.getElementById("provLabel").hidden = false;
	document.getElementById("ctLabel").hidden = false;
	document.getElementById("zipLabel").hidden = false;
	document.getElementById("phnLabel").hidden = false;
	
	document.getElementById("confirmAndPay").hidden = false;
}

function create2(address){
	//validate();
	document.getElementById("infoTable").style.display = "";
	hideRest();
	hideLoginDisplay();
	document.getElementById("fnameInp").hidden = false;
	document.getElementById("lnameInp").hidden = false;
	document.getElementById("streetNameInp").hidden = false;
	document.getElementById("provInp").hidden = false;
	document.getElementById("ctInp").hidden = false;
	document.getElementById("zipInp").hidden = false;
	document.getElementById("phnInp").hidden = false;
	
	document.getElementById("confirmAndPay").hidden = false;
	
}

function hideLoginDisplay(){
	document.getElementById("fnameLabel").hidden = true;
	document.getElementById("lnameLabel").hidden = true;
	document.getElementById("streetNameLabel").hidden = true;
	document.getElementById("provLabel").hidden = true;
	document.getElementById("ctLabel").hidden = true;
	document.getElementById("zipLabel").hidden = true;
	document.getElementById("phnLabel").hidden = true;
}

function hideCreateDisplay(){
	document.getElementById("fnameInp").hidden = true;
	document.getElementById("lnameInp").hidden = true;
	document.getElementById("streetNameInp").hidden = true;
	document.getElementById("provInp").hidden = true;
	document.getElementById("ctInp").hidden = true;
	document.getElementById("zipInp").hidden = true;
	document.getElementById("phnInp").hidden = true;	
}

function showCreditCard(address){
	//validate();
	document.getElementById("credit").hidden = false;
	document.getElementById("creditNum").hidden = false;
	document.getElementById("confirmOrder").hidden = false;
}

function hideRest(){
	document.getElementById("pTable").style.display = "none";
	document.getElementById("credit").hidden = true;
	document.getElementById("creditNum").hidden = true;
	document.getElementById("confirmOrder").hidden = true;
}