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
function login(address){
    hideEverything();
    document.getElementById("loginBox").hidden = false;
    document.getElementById("createBox").hidden = true;
}

function create(address){
    hideEverything();
    document.getElementById("loginBox").hidden = true;
    document.getElementById("createBox").hidden = false;
}

function login2(address){
    //validate();

	var un = document.getElementById("userName").value;
	var pwd = document.getElementById("pwd").value;

	var request = new XMLHttpRequest();
	request.open("GET", (address + "?username=" + un + "&password=" + pwd), true);
	request.onreadystatechange = function() {
		loginInfoHandler(request);
	};
	
	hideEverything();
	document.getElementById("info").hidden = false;
	request.send();

}

function loginInfoHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		var responseInfo = request.responseText;
		var info = responseInfo.split('|');

		document.getElementById("fnameLabel").innerHTML += info[0].trim();
		document.getElementById("lnameLabel").innerHTML += info[1].trim();
		document.getElementById("streetNameLabel").innerHTML += info[2].trim();
		document.getElementById("provLabel").innerHTML += info[3].trim();
		document.getElementById("ctLabel").innerHTML += info[4].trim();
		document.getElementById("zipLabel").innerHTML += info[5].trim();
		document.getElementById("phnLabel").innerHTML += info[6].trim();
	}


}

function create2(address){
	//validate();

	var taken = false;
	var done = false;

	var un = document.getElementById("userName").value;
	var pwd = document.getElementById("pwd").value;

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

function validUsername(address, un, pwd){

//  validate();
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
		alert("Account added!");
	}
}

function showCreditCard(address){
	//validate();
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