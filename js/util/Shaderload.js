function loadShaderFromId(id) {
	var httpRequest = new XMLHttpRequest();
	/*httpRequest.onreadystatechange = function() {
		if (httpRequest.readystate == 4 && 
			httpRequest.status == 200) {
		}
	}*/
	httpRequest.open('GET', document.getElementById(id).src);
	httpRequest.send();
	return httpRequest.resopnseText;
}