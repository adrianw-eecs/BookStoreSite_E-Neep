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