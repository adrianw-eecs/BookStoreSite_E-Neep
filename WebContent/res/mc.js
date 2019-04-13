function populateAndShow(s1, s2, address){
	var l_s1 = document.getElementById(s1);
	var l_s2 = document.getElementById(s2);
	var length = l_s2.options.length;
	for (i = 1; i < length; i++) {
	  l_s2.options[i] = null;
	}
	l_s2.hidden = true;
	document.getElementById("bookInfo").hidden = true;
	document.getElementById("addToCart").hidden = true;
	var request = new XMLHttpRequest();
	if(l_s1.value == "Science"){
		request.open("GET", (address + "?category=Science"), true);
	}
	if(l_s1.value == "Fiction"){
		request.open("GET", (address + "?category=Fiction"), true);
	}
	if(l_s1.value == "Engineering"){
		request.open("GET", (address + "?category=Engineering"), true);
	}
	request.onreadystatechange = function() {
		dropDownHandler(request, l_s2);
	};
	request.send();

}

function dropDownHandler(request, target){
	if ((request.readyState == 4) && (request.status == 200)){
		var responseArray = request.responseText;
		if (responseArray != ""){

			target.hidden = false;
			responseArray = responseArray.substring(1, responseArray.length - 1);
			var elements = responseArray.split(',');
			
			for (var book in elements){
				var pair = elements[book].split('|');
				var newOption = document.createElement('option');
				newOption.value = pair[0].trim();
				newOption.innerHTML = pair[1].trim();
				target.options.add(newOption);
			}
			
		}else{
			alert("Sorry, no books of that category have been found!");
		}
	}
}

function createTableForBook(bookId, address){
	var id = document.getElementById(bookId);
	var request = new XMLHttpRequest();
	request.open("GET", (address + "?bid=" + id.value), true);
	request.onreadystatechange = function() {
		document.getElementById("bookInfo").hidden = false;
		document.getElementById("bookResult").innerHTML = "";
		document.getElementById("addToCart").hidden = false;
		tableHandler(request);
	};
	request.send();
}

function tableHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		var responseInfo = request.responseText;
		var info = responseInfo.split('|');
		document.getElementById("btitle").innerHTML = info[0];
		document.getElementById("brating").innerHTML = info[1];
		document.getElementById("bprice").innerHTML = "$" + info[2];
	}
}

function addReview(address){
	var request = new XMLHttpRequest();
	var review = document.getElementById("bookReview").value;
	document.getElementById("bookReview").value = "";
	var bid = document.getElementById("bookTitles");
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
		document.getElementById("bookResult").hidden = false;
		document.getElementById("bookResult").innerHTML = "Your review has been submitted!"; 
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


