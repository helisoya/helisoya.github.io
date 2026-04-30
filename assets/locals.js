function getLocal(key, useFR) {
	if (useFR)
		return localsFR[key];

	return localsEN[key];
}

function reloadLocals(useFR) {
	testElements = document.getElementsByClassName("localized");
	for (var i = 0; i < testElements.length; i++) {
		testElements[i].innerHTML = getLocal(testElements[i].id, useFR);
	}

	const imgChangeLanguage = document.getElementById("changeLocalImg");
	if (useFR)
		imgChangeLanguage.src = imgChangeLanguage.src.replace("english.png", "french.png");
	else
		imgChangeLanguage.src = imgChangeLanguage.src.replace("french.png", "english.png");

}

function printLocals() {
	var result = "<script type='text/javascript'>\n";
	testElements = document.getElementsByClassName("localized");

	result += "const localsFR = {";

	for (var i = 0; i < testElements.length; i++) {
		result += "\n\t\"" + testElements[i].id + "\": \"" + localsFR[testElements[i].id] + "\",";
	}

	result += "\n};\n\nconst localsEN = {";

	for (var i = 0; i < testElements.length; i++) {
		result += "\n\t\"" + testElements[i].id + "\": \"" + localsEN[testElements[i].id] + "\",";
	}

	result += "\n</script>";

	console.log(result);

}

function reloadLocalsFromCookie() {
	var useFR = getCookie("language") == "fra";

	reloadLocals(useFR);
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function setCookie(language) {
	document.cookie = "language=" + language;
}

function switchLocals() {
	if (getCookie("language") == "fra")
		setCookie("eng");
	else
		setCookie("fra");
}

const buttonChangeLanguage = document.getElementById("changeLocalButton");
buttonChangeLanguage.addEventListener("click", switchLocals);

if (getCookie("language") == "")
	setCookie("fra");

reloadLocalsFromCookie();