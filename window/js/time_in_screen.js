function time() {
	var time_node = document.getElementsByClassName('time_in_screen');
	var child_nodes = time_node[0].children;
	var date = new Date();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var Minutes = date.getMinutes().toString().length == 2 ? date.getMinutes() : '0' + date.getMinutes();
	const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	var nowWeek = weeks[date.getDay()];
	child_nodes[0].innerHTML = hour + ':' + Minutes;
	child_nodes[1].innerHTML = month + '月' + day + '日' + ',' + nowWeek;

	child_nodes = null;
	time_node = null;
};
(function () {
	var time1 = setInterval(() => {
		var time_in_screen = document.getElementsByClassName('time_in_screen')[0];
		if (time_in_screen==undefined) {
			clearInterval(time1);
		}else {
			time();
		};
		
		time_in_screen = null;
	}, 1000);

})();