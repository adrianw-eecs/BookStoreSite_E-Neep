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


