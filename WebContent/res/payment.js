function validateLogin(){
	var ok = true;
	var p = document.getElementById("userNameLogin").value;

	if (p === ""){
		blinkObj(document.getElementById("userNameLogin"));
		ok = false;
	}


	p = document.getElementById("pwdLogin").value;
	if (p === ""){
		blinkObj(document.getElementById("pwdLogin"));
		ok = false;
	}
	return ok;
}

function validateCreateUN(){
	var ok = true;
	var p = document.getElementById("username").value;


	if (p === ""){
		blinkObj(document.getElementById("username"));
		ok = false;
	}

	return ok;
}

function validateCreate(){
	var ok = true;
	var p = document.getElementById("username").value;

	if (p === ""){
		alert("Username cannot be empty!");
		blinkObj(document.getElementById("username"));
		ok = false;
	}

	p = document.getElementById("pwd").value;

	if (p === ""){
		if (ok) alert("Password cannot be empty!");
		blinkObj(document.getElementById("pwd"));
		ok = false;
	}
	p = document.getElementById("fnameInp").value;

	if (p === ""){
		blinkObj(document.getElementById("fnameInp"));
		ok = false;
	}
	p = document.getElementById("lnameInp").value;

	if (p === ""){
		blinkObj(document.getElementById("lnameInp"));
		ok = false;
	}

	p = document.getElementById("streetNameInp").value;

	if (p === ""){
		blinkObj(document.getElementById("streetNameInp"));
		ok = false;
	}

	p = document.getElementById("provInp").value;

	if (p === ""){
		blinkObj(document.getElementById("provInp"));
		ok = false;
	}
	p = document.getElementById("ctInp").value;

	if (p === ""){
		blinkObj(document.getElementById("ctInp"));
		ok = false;
	}
	p = document.getElementById("zipInp").value;

	if (p === ""){
		blinkObj(document.getElementById("zipInp"));
		ok = false;
	}
	p = document.getElementById("phnInp").value;

	if (p === ""){
		blinkObj(document.getElementById("phnInp"));
		ok = false;
	}


	return ok;
}

function blinkObj(obj){
	var orig = obj.style.boxShadow;
	obj.style.boxShadow = "0 0 5px white";
	setTimeout(function(){
		obj.style.boxShadow = orig;
	}, 700);
}

function login(address){
	hideEverything();
	document.getElementById("loginBox").hidden = false;
}

function create(address){
	hideEverything();
	document.getElementById("createBox").hidden = false;
}

function login2(address){
	if (!validateLogin()) return;

	var un = document.getElementById("userNameLogin").value;
	var pwd = document.getElementById("pwdLogin").value;

	var request = new XMLHttpRequest();
	request.open("GET", (address + "?username=" + un + "&password=" + pwd), true);
	request.onreadystatechange = function() {
		loginInfoHandler(request);
	};


	request.send();

}

function loginInfoHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		var responseInfo = request.responseText;
		if (responseInfo != ""){
			var info = responseInfo.split('|');

			document.getElementById("fnameLabel").innerHTML += info[0].trim();
			document.getElementById("lnameLabel").innerHTML += info[1].trim();
			document.getElementById("streetNameLabel").innerHTML += info[2].trim();
			document.getElementById("provLabel").innerHTML += info[3].trim();
			document.getElementById("ctLabel").innerHTML += info[4].trim();
			document.getElementById("zipLabel").innerHTML += info[5].trim();
			document.getElementById("phnLabel").innerHTML += info[6].trim();
			hideEverything();
			document.getElementById("info").hidden = false;
		}else{
			alert ("Wrong username and/or password");
		}
	}


}

function create2(address){
	validateCreateUN();


	var taken = false;
	var done = false;

	var un = document.getElementById("username").value;
	var pwd = document.getElementById("pwd").value;

	if (un != ""){
		var request = new XMLHttpRequest();
		request.open("GET", (address + "?verify=true&username=" + un + "&password=" + pwd), true);
		request.onreadystatechange = function() {
			if ((request.readyState == 4) && (request.status == 200)){
				taken = request.responseText == "taken";
				done = true;
			}
		};

		var interval = setInterval(function(){getTaken(address)}, 10);

		function getTaken(address){
			if (done){
				interval = clearInterval(interval);
				if (taken && un != "") {
					alert("Username taken, please choose another one");
				}
				else if (!taken){
					validUsername(address, un, pwd);
				}
			}
		}
		request.send();				

	}

}

function validUsername(address, un, pwd){

	hideEverything();
	document.getElementById("createBox").hidden = false;

	var request = new XMLHttpRequest();
	request.open("POST", (address + "?username=" + un + "&password=" + pwd), true);
	request.onreadystatechange = function() {
		createInfoHandler(request);
	};
	request.send();

}

function createInfoHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
//		alert("Account added!");
	}
}

function showCreditCard(address){
	if (!validateCreate()) return;

	if (!document.getElementById("createBox").hidden){
		var fname = document.getElementById("fnameInp").value;
		var lname = document.getElementById("lnameInp").value;
		var street = document.getElementById("streetNameInp").value;
		var prov = document.getElementById("provInp").value;
		var country = document.getElementById("ctInp").value;
		var ZIP = document.getElementById("zipInp").value;
		var phone = document.getElementById("phnInp").value;	

		var request = new XMLHttpRequest();
		request.open("POST", (address 
				+ "?fname=" + fname 
				+ "&lname=" + lname
				+ "&street=" + street
				+ "&prov=" + prov
				+ "&country=" + country
				+ "&zip=" + ZIP
				+ "&phone=" + phone), true);
		request.onreadystatechange = function() {
			submitInfoHandler(request);
		};
		request.send();
		document.getElementById("confirmNewOrder").hidden = false;
		document.getElementById("confirmOrder").hidden = true;
	}else{
		document.getElementById("confirmOrder").hidden = false;
		document.getElementById("confirmNewOrder").hidden = true;
	}
	hideEverything();
	document.getElementById("creditNum").value = null;
	document.getElementById("credit").hidden = false;

}

function submitInfoHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		alert("Account successfully created!");
	}
}

function addCredit(address){
	var cnum = document.getElementById("creditNum").value;
	document.getElementById("creditNum").value = null;
	var request = new XMLHttpRequest();
	request.open("POST", (address + "?creditNum=" + cnum), true);
	request.onreadystatechange = function() {
		submitCreditNum(request);
	};
	request.send();

}

function submitCreditNum(request){
	if ((request.readyState == 4) && (request.status == 200)){
		alert("Thank you for your patronage!");
	}
}

function finalize(address){
	var cnum = document.getElementById("creditNum").value;
	document.getElementById("creditNum").value = null;
	var request = new XMLHttpRequest();
	request.open("GET", (address + "?creditNum=" + cnum), true);
	request.onreadystatechange = function() {
		checkCreditNum(request);
	};
	request.send();

}

function checkCreditNum(request){
	if ((request.readyState == 4) && (request.status == 200)){
		alert(request.responseText);
	}
}

function hideEverything(){
	document.getElementById("createBox").hidden = true;
	document.getElementById("loginBox").hidden = true;
	document.getElementById("credit").hidden = true;
	document.getElementById("info").hidden = true;
}