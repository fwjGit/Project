var screen = document.getElementById("screen");
var children = screen.children;
var click = function () {
	// this.style.background = "-webkit-cross-fade(url(../img/screen.jpg), url(../img/opacity.jpg), 98%);";
	this.classList.add('opacity');
	this.classList.remove('imgShow');
	this.children[0].classList.add('hidden');
	this.children[1].classList.remove('hidden');

	var input = document.getElementsByTagName("input");
	input[0].focus();
	input = null;
	this.onclick = null;
};
screen.onclick = click;
document.addEventListener('keypress', click.bind(screen));
children = null;
screen = null;