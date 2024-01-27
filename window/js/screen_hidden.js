var screen = document.getElementById("screen");
var children = screen.children;
var click = function () {
	// this.style.background = "-webkit-cross-fade(url(../img/screen.jpg), url(../img/opacity.jpg), 98%);";
	var time_in_screen = document.getElementsByClassName('time_in_screen')[0];
	if (time_in_screen !== undefined) {
		this.classList.add('opacity');
		this.classList.remove('imgShow');
		this.children[0].classList.add('hidden');
		this.children[1].classList.remove('hidden');
		this.removeChild(this.children[0]);
		document.removeEventListener('click', event_ClickOrKeypress);
		click = null;
	} else {
		var desktop = document.getElementById("desktop");
		var className = desktop.className;
		if (!className.includes('hidden')) {
			document.removeEventListener('keypress', event_ClickOrKeypress);
			event_ClickOrKeypress = null;
		} else {
			var input = document.getElementsByTagName("input");
			input[0].focus();

			input = null;
		};

		desktop = null;
	};

	time_in_screen = null;
};
var event_ClickOrKeypress = click.bind(screen);
document.addEventListener("click", event_ClickOrKeypress);
document.addEventListener('keypress', event_ClickOrKeypress);

children = null;
screen = null;