var login = document.getElementsByClassName("login")[0];
var div = document.createElement('div');
login.appendChild(div);
login = login.children[2];

function FailLog(props) {
	return (
		<form class='password_error' action="" onSubmit={(e) => e.preventDefault()}>
			<label for="button">密码不正确。请再试一次。</label><br />
			<button name='button' onClick={props.isHidden}>确定</button>
		</form>
	);
};
function SuccessLog(props) {
	if (props.isOn) {
		return <p id='password_reset'>重置密码</p>
	} else {
		return <p id='Success_Log'>欢迎</p>
	};
};
function ShowLogState(props) {
	if (props.isLock[0] !== null) {
		if (props.isLock[0]) {
			if (props.isLock[1]) {
				return <FailLog isHidden={props.isLock[2]} />
			} else {
				return <SuccessLog isOn={props.isLock[0]} />
			};
		} else {
			return <SuccessLog isOn={props.isLock[0]} />
		};
	};
};
class LoginComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLock: null,
			isHidden: false,
			password: null,
			password_list: {
				1: '123',
				2: '456',
				3: '789'
			}
		};
		this.inputRef = React.createRef();
		this.LogIn = this.LogIn.bind(this);
		this.ShowValue = this.ShowValue.bind(this);
		this.HandleKeyDown = this.HandleKeyDown.bind(this);
		this.Hidden = this.Hidden.bind(this);
	};
	LogIn(e) {
		var node_dom = e.target;
		var value = node_dom.value;
		const password_list = this.state.password_list;
		if (Object.values(password_list).includes(value)) {
			var time1 = setTimeout(() => {
				this.setState({ isLock: false });
				clearTimeout(time1);
			},0);
			var time2 = setTimeout(() => {
				//var current=document.getElementsByClassName('login')[0];
				var screen = document.getElementById("screen");
				var children = screen.children;
				children[0].classList.add('hidden');
				children[1].classList.remove('hidden');
				children[2].classList.remove('hidden');
				screen.removeChild(children[0]);

				children = null;
				screen = null;
				clearTimeout(time2);
			}, 100);
		} else {
			this.setState({ isLock: true });
			this.Hidden(e);
		};
	};
	ShowValue(e) {
		var node_dom = e.target;
		var value = node_dom.value;
		this.setState({
			password: value
		});
	};
	HandleKeyDown(e) {
		if (e.nativeEvent.keyCode === 13) {
			//alert('密码正确');
			this.LogIn(e);
		};
	};
	Hidden(e) {
		e.preventDefault();
		var isHidden = this.state.isHidden;
		var isLock = this.state.isLock;
		if (isLock) {
			this.setState({
				isHidden: !isHidden,
				password: ''
			});
		} else {
			this.setState({ isHidden: true });
		};
	};
	componentDidMount() {
		this.inputRef.current.focus();
	};
	render() {
		var isLock = this.state.isLock;
		var isHidden = this.state.isHidden;
		var password = this.state.password;
		var inputRef = this.inputRef;
		return (
			<form action="" class='lock' onSubmit={(e) => e.preventDefault()}>

				<input ref={inputRef} type="text" style={{ display: isHidden ? 'none' : 'block' }} placeholder="密码" value={password} onChange={this.ShowValue} onKeyPress={this.HandleKeyDown} />
				<ShowLogState isLock={[isLock, isHidden, this.Hidden]} />
			</form>
		);
	};
};


const loginReact = (
	<span>
		<LoginComponent />
	</span>
);
ReactDOM.render(loginReact, login);

div=null;
login = null;