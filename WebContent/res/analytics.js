var interval;

function confirmAdmin(address){
	var valid = false;
	var done = false;

	var un = document.getElementById("userName").value;
	var pwd = document.getElementById("pwd").value;

	var request = new XMLHttpRequest();
	request.open("GET", (address + "?verifyAdmin=true&username=" + un + "&password=" + pwd), true);
	request.onreadystatechange = function() {
		if ((request.readyState == 4) && (request.status == 200)){
			valid = request.responseText == "valid";
			done = true;
		}
	};

	var interval = setInterval(function(){getTaken(address)}, 10);

	function getTaken(address){
		if (done){
			interval = clearInterval(interval);
			if (!valid) {
				alert("Username invalid");
			}
			else if (valid){
				validAdmin();
			}
		}
	}
	request.send();	
}

function validAdmin(){
	hideEverything();
	document.getElementById("buttons").hidden = false;
}

function hideEverything(){
	document.getElementById("buttons").hidden = true;
	document.getElementById("loginBox").hidden = true;
	document.getElementById("top-ten-container").hidden = true;
}

function showTopTen(address){
	hideEverything();
	document.getElementById("top-ten-container").hidden = false;
	document.getElementById("all-books-container").hidden = true;

	var request = new XMLHttpRequest();
	request.open("GET", (address + "?topTen=true"), true);
	request.onreadystatechange = function() {
		startQueryTimer("topTen", request);
	};
	request.send();

}

function showMonthBooks(address){
	hideEverything();
	document.getElementById("top-ten-container").hidden = true;
	document.getElementById("all-books-container").hidden = false;

	var request = new XMLHttpRequest();
	request.open("GET", (address + "?allBooks=true"), true);
	request.onreadystatechange = function() {
		startQueryTimer("allBooks", request);
	};
	request.send();

}

function startQueryTimer(tableName, request){
	clearInterval(interval);
	if (tableName === "topTen"){
		topTenHandler(request);
		interval = setInterval(function(){topTenHandler(request)}, 1000);
	}else if (tableName === "allBooks"){
		allBooksHandler(request)
		interval = setInterval(function(){allBooksHandler(request)}, 1000);
	}
}

function topTenHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		var table = document.getElementById("top-ten-table");
		var responseArray = request.responseText;
		if (responseArray != ""){
			for(var i = table.rows.length - 1; i > 0; i--)
			{
				table. deleteRow(i);
			}
			
			
			responseArray = responseArray.substring(1, responseArray.length - 1);

			var elements = responseArray.split(',');

			
			for (var qty in elements){
				
				var toBeUsed = elements[qty].trim();
				if (toBeUsed === "null") break;
				var info = toBeUsed.split('|');
				var row = table.insertRow(+qty + +1);
				row.insertCell(0).innerHTML = +qty + +1;
				row.insertCell(1).innerHTML = info[0].trim();
				row.insertCell(2).innerHTML = info[1].trim();
			}
		}
	}
}

function allBooksHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		var table = document.getElementById("all-books-table");
		var responseArray = request.responseText;
		if (responseArray != ""){
			for(var i = table. rows. length - 1; i > 0; i--)
			{
				table. deleteRow(i);
			}
			
			responseArray = responseArray.substring(1, responseArray.length - 1);

			var elements = responseArray.split(',');

			for (var qty in elements){
				var toBeUsed = elements[qty].trim();
				var info = toBeUsed.split('|');
				var row = table.insertRow(+qty + +1);
				row.insertCell(0).innerHTML = +qty + +1;
				row.insertCell(1).innerHTML = info[0].trim();
				row.insertCell(2).innerHTML = info[1].trim();
			}
		}
	}
}