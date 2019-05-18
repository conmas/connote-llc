// to do - add a script that scrolls the page to the form when there's an error

$(document).ready(function(){
	if($('.thanks').length) {
		window.scroll(0,900);
	} else {
		console.log("Nothing to see here folks")
	}
});