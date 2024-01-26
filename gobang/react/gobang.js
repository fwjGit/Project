var body = document.getElementsByTagName('body')[0];

class Gobang extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: 'white',           // 'white'代表白字，'black'代表黑子
			wins: [],
			win_num: 0,
			backWins_white: [],
			backWins_black: [],
			isShow: false,
			isInitial: false
		};
		this.Click = this.Click.bind(this);
		this.ObtainCoords = this.ObtainCoords.bind(this);
		this.Close = this.Close.bind(this);
	};
	componentDidMount() {
		// 绘制棋盘(20*20)
		var canvas = document.getElementById('gobang');
		var cxt = canvas.getContext('2d');

		cxt.strokeStyle = 'black';
		cxt.rect(15, 15, 570, 570)  // rect(x, y, width, height)		
		cxt.stroke()

		for (var i = 1; i <= 18; i++) {  //绘制竖线
			cxt.beginPath();
			cxt.moveTo(15 + 30 * i, 15);
			cxt.lineTo(15 + 30 * i, 585);
			cxt.stroke();
			cxt.strokeStyle = 'black';
		};

		for (var i = 1; i <= 18; i++) {  //绘制横线
			cxt.beginPath();
			cxt.moveTo(15, 15 + 30 * i);
			cxt.lineTo(585, 15 + 30 * i);
			cxt.stroke();
			cxt.strokeStyle = 'black';
		};

		// 初始化赢法数组
		var wins = this.state.wins;
		for (var i = 0; i < 20; i++) {
			wins[i] = [];
			for (var j = 0; j < 20; j++) {
				wins[i][j] = [];
			};
		};

		var number = 0;  //赢法索引
		//横线赢
		for (var i = 0; i < 20; i++) {
			for (var j = 0; j <= 15; j++) {
				for (var k = 0; k < 5; k++) {
					wins[i][j + k][number] = true;
				};
				number++;
			};
		};

		//竖线赢
		for (var i = 0; i < 20; i++) {
			for (var j = 0; j <= 15; j++) {
				for (var k = 0; k < 5; k++) {
					wins[j + k][i][number] = true;
				};
				number++;
			};
		};

		//正斜线赢
		for (var i = 0; i <= 15; i++) {
			for (var j = 0; j <= 15; j++) {
				for (var k = 0; k < 5; k++) {
					wins[i + k][j + k][number] = true;
				};
				number++;
			};
		};

		//反斜线赢
		for (var i = 0; i <= 15; i++) {
			for (var j = 19; j >= 4; j--) {
				for (var k = 0; k < 5; k++) {
					wins[i + k][j - k][number] = true;
				};
				number++;
			};
		};

		// 初始化backWins数组
		var backWins_white = Array(number).fill(0);
		var backWins_black = Array(number).fill(0);

		this.setState({
			wins: wins,
			win_num: number,
			backWins_white: backWins_white,
			backWins_black: backWins_black
		});

		canvas = null;
	};
	ObtainCoords(dom, event) {  // 获取鼠标点击位置坐标
		var x = event.clientX;
		var y = event.clientY;

		let rect = dom.getBoundingClientRect();
		x -= (rect.left + 15);
		y -= (rect.top + 15);

		// 获取精确其棋盘上交点坐标，坐标x或y在[10,20]区间的返回null，代表点击无效，需要点击在交点附近
		var lineX_number = parseInt((x - x % 30) / 30);
		var lineY_number = parseInt((y - y % 30) / 30);
		var distanceX = x % 30;
		var distanceY = y % 30;
		if (distanceX < 10) {
			distanceX = 0;
		} else if (distanceX > 20) {
			distanceX = 30;
		} else {
			return null
		};
		if (distanceY < 10) {
			distanceY = 0;
		} else if (distanceY > 20) {
			distanceY = 30;
		} else {
			return null
		};

		x = lineX_number * 30 + distanceX;
		y = lineY_number * 30 + distanceY;

		return [x, y]
	};
	Click(e) {
		var target = e.target;
		var coords = this.ObtainCoords(target, e);
		if (coords !== null) {
			// 点击生成圆形，并填充颜色
			var color = this.state.color;
			var x = coords[0] + 15;
			var y = coords[1] + 15;
			var cxt = target.getContext('2d');

			cxt.beginPath();
			cxt.strokeStyle = 'transparent';
			cxt.fillStyle = color;
			cxt.arc(x, y, 10, 0, 360 * Math.PI / 180);
			cxt.closePath();
			cxt.stroke();
			cxt.fill();

			//初始化state中的backWins数组
			var index_X = parseInt((x - 15) / 30);
			var index_Y = parseInt((y - 15) / 30);
			var backWins_white = this.state.backWins_white;
			var backWins_black = this.state.backWins_black;
			var win_num = this.state.win_num;
			var wins = this.state.wins;
			var isShow = this.state.isShow;
			for (var i = 0; i < win_num; i++) {
				if (wins[index_Y][index_X][i]) {
					if (color == 'white') {
						backWins_white[i] += 1;
					} else {
						backWins_black[i] += 1;
					};
				};
				if (backWins_white[i] == 5 || backWins_black[i] == 5) {
					isShow = true;
					this.setState({
						backWins_white: backWins_white,
						backWins_black: backWins_black,
						isShow: isShow
					});
					return
				};
			};

			this.setState({
				color: color == 'white' ? 'black' : 'white',
				backWins_white: backWins_white,
				backWins_black: backWins_black,
				isShow: isShow
			});
		};
	};
	Close(e) {
		// 关闭弹窗，重新加载网页
		var isShow = this.state.isShow;
		var isInitial = this.state.isInitial;
		var time1 = setTimeout(() => {
			this.setState({
				isShow: !isShow,
				isInitial: !isInitial
			});
			time1 = null;
		}, 0);
		location.reload();
	};
	render() {
		var click = this.Click;
		var isShow = this.state.isShow;
		var color = this.state.color;
		var close = this.Close;
		var isInitial = this.state.isInitial;
		var data = {
			color: color,
			isShow: isShow,
			close: close
		};
		return (
			<div id="container" style={{ display: isInitial ? 'none' : 'block' }}>
				<canvas id="gobang" width='600' height='600' onClick={click}></canvas>
				<Message data={data} />
			</div>
		);
	};
};

function Message(props) {
	return (
		<div id="message" style={{ display: props.data.isShow ? 'block' : 'none' }} onClick={props.data.close}>
			<div class='menu'>
				<p>信息</p>
				<div>&times;</div>
			</div>
			<div class='context'>
				<p>{props.data.color == "white" ? '白方胜' : '黑方胜'}</p>
				<button onClick={props.data.close}>确定</button>
			</div>
		</div>
	);
};

const gobang = (
	<Gobang />
);

ReactDOM.render(gobang, body);

body = null;