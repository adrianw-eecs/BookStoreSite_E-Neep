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
	document.getElementById("pTable").style.display = "";
	document.getElementById("infoTable").style.display = "none";
	document.getElementById("loginNow").hidden = false;
	document.getElementById("createNow").hidden = true;
	document.getElementById("accResult").hidden = true;
}

function create(address){
	document.getElementById("pTable").style.display = "";
	document.getElementById("infoTable").style.display = "none";
	document.getElementById("loginNow").hidden = true;
	document.getElementById("createNow").hidden = false;
	document.getElementById("accResult").hidden = true;
}

function login2(address){
	//validate();
	document.getElementById("infoTable").style.display = "";
	hideRest();
	hideCreateDisplay();

	var un = document.getElementById("userName").value;
	var pwd = document.getElementById("pwd").value;

	var request = new XMLHttpRequest();
	request.open("GET", (address + "?username=" + un + "&password=" + pwd), true);
	request.onreadystatechange = function() {
		loginInfoHandler(request);
	};
	request.send();

	document.getElementById("fnameLabel").hidden = false;
	document.getElementById("lnameLabel").hidden = false;
	document.getElementById("streetNameLabel").hidden = false;
	document.getElementById("provLabel").hidden = false;
	document.getElementById("ctLabel").hidden = false;
	document.getElementById("zipLabel").hidden = false;
	document.getElementById("phnLabel").hidden = false;

	document.getElementById("confirmAndPay").hidden = false;
}

function loginInfoHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		var responseInfo = request.responseText;
		var info = responseInfo.split('|');

		showSectionNames();
		document.getElementById("fnameLabel").innerHTML = info[0].trim();
		document.getElementById("lnameLabel").innerHTML = info[1].trim();
		document.getElementById("streetNameLabel").innerHTML = info[2].trim();
		document.getElementById("provLabel").innerHTML = info[3].trim();
		document.getElementById("ctLabel").innerHTML = info[4].trim();
		document.getElementById("zipLabel").innerHTML = info[5].trim();
		document.getElementById("phnLabel").innerHTML = info[6].trim();
	}


}

function create2(address){
	//validate();
	document.getElementById("infoTable").style.display = "";
	hideRest();
	hideLoginDisplay();

	var un = document.getElementById("userName").value;
	var pwd = document.getElementById("pwd").value;

	var request = new XMLHttpRequest();
	request.open("POST", (address + "?username=" + un + "&password=" + pwd), true);
	request.onreadystatechange = function() {
		createInfoHandler(request);
	};
	request.send();

	showSectionNames();
	document.getElementById("fnameInp").hidden = false;
	document.getElementById("lnameInp").hidden = false;
	document.getElementById("streetNameInp").hidden = false;
	document.getElementById("provInp").hidden = false;
	document.getElementById("ctInp").hidden = false;
	document.getElementById("zipInp").hidden = false;
	document.getElementById("phnInp").hidden = false;

	document.getElementById("confirmAndPay").hidden = false;

}

function createInfoHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		alert("Username Valid");
	}
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
	if (!document.getElementById("fnameInp").hidden){
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

		document.getElementById("accResult").hidden = false;
	}

	hideEverythingElse();
	document.getElementById("creditNum").value = null;
	document.getElementById("credit").hidden = false;
	document.getElementById("creditNum").hidden = false;
	document.getElementById("confirmOrder").hidden = false;

}

function submitInfoHandler(request){
	if ((request.readyState == 4) && (request.status == 200)){
		document.getElementById("accResult").innerHTML = "Account successfully created!";
	}
}

function finalize(address){
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
		
		document.getElementById("creditResult").innerHTML = "Thank you!";
		document.getElementById("creditResult").hidden = false;
	}
}

function hideEverythingElse(){
	hideCreateDisplay();
	hideLoginDisplay();
	hideSectionNames();
}

function showSectionNames(){
	document.getElementById("fname").hidden = false;
	document.getElementById("lname").hidden = false;
	document.getElementById("stname").hidden = false;
	document.getElementById("zipname").hidden = false;
	document.getElementById("ctname").hidden = false;
	document.getElementById("provname").hidden = false;
	document.getElementById("phnname").hidden = false;
	document.getElementById("confirmAndPay").hidden = false;
}

function hideSectionNames(){
	document.getElementById("fname").hidden = true;
	document.getElementById("lname").hidden = true;
	document.getElementById("stname").hidden = true;
	document.getElementById("zipname").hidden = true;
	document.getElementById("ctname").hidden = true;
	document.getElementById("provname").hidden = true;
	document.getElementById("phnname").hidden = true;
	document.getElementById("confirmAndPay").hidden = true;
}

function hideRest(){
	document.getElementById("pTable").style.display = "none";
	document.getElementById("credit").hidden = true;
	document.getElementById("creditNum").hidden = true;
	document.getElementById("confirmOrder").hidden = true;
	document.getElementById("accResult").hidden = true;
	document.getElementById("creditResult").hidden = true;
}