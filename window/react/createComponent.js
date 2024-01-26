var screen = document.getElementById('screen');
var desktop = document.getElementById('desktop');
var menu = document.getElementById('Menu');

function CreateComponent(props) {
	return (
		<div id={props.data.id} class={props.data.class} onClick={props.data.click}>
			<img src={props.data.url} alt={props.data.title} />
			<p>{props.data.title}</p>
		</div>
	);
};
function CreateFolderComponent(props) {
	// React.useEffect(()=>{
	// 	var id=props.data.id;
	// 	props.data.click(id);
	// });
	var click = () => {
		var folder_context = document.getElementsByClassName('folder_context')[0];
		var id = props.data.id;
		var length = props.data.dom[id].length;
		var file = props.data.dom[id].file;
		var table = document.createElement('table');
		for (var i = 0; i <= length; i++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < 4; j++) {
				if (i == 0) {
					th = document.createElement('th');
					if (j == 0) {
						th.innerText = '名称';
					} else if (j == 1) {
						th.innerText = '修改日期';
					} else if (j == 2) {
						th.innerText = '类型';
					} else {
						th.innerText = '大小';
					};
					tr.appendChild(th);
				} else {
					td = document.createElement('td');
					var index = i;
					if (j == 0) {
						td.innerText = file[index].name;
					} else if (j == 1) {
						td.innerText = file[index].date;
					} else if (j == 2) {
						td.innerText = file[index].type;
					} else {
						td.innerText = file[index].size;
					};
					tr.appendChild(td);
				};
			};
			table.appendChild(tr);
		};
		folder_context.innerHTML = null;
		folder_context.appendChild(table);
		props.data.click([length, id]);
		folder_context = null;
	};
	return (
		<div id={props.data.id} class={props.data.class} onClick={click}>
			<img src={props.data.url} alt={props.data.title} />
			<p>{props.data.title}</p>
		</div>
	);
};

class CreateInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			context: {
				'picture_image': '新建 JPG 图像.jpg',
				'Word': '新建 Microsoft Word 文档.docx',
				'PowerPoint': "新建 Microsoft PowerPoint 演示文稿.pptx",
				'excel': '新建 Microsoft Excel 工作表.xlsx',
				'text': "新建 文本文档.txt"
			}
		};
	}
	render() {
		var name = props.name;
		var context = this.state.context[name];
		console.log(name)
		return <input value={context} />
	}
}

class FolderComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				'home': {
					length: 1,
					file: {
						1: {
							name: '示例文件.docx',
							date: '2023/7/5 11:10',
							type: 'Microsoft Word',
							size: '85 KB'
						}
					},
				},
				'picture': {
					length: 2,
					file: {
						1: {
							name: '图片1.jpg',
							date: '2023/9/5 10:10',
							type: 'JPG 文件',
							size: '2,941 KB'
						},
						2: {
							name: '图片2.png',
							date: '2024/1/5 12:16',
							type: 'PNG 文件',
							size: '921 KB'
						}
					}
				},
				'desktop_folder': {
					length: 0,
					file: {}
				},
				'download': {
					length: 0,
					file: {}
				},
				'document': {
					length: 2,
					file: {
						1: {
							name: 'test1.pptx',
							date: '2024/1/2 15:20',
							type: 'Microsoft PowerPoint',
							size: '5,521 KB'
						},
						2: {
							name: 'test2.docx',
							date: '2024/1/5 12:16',
							type: 'Microsoft Word',
							size: '61 KB'
						}
					}
				},
				'music': {
					length: 0,
					file: {}
				},
				'vedio': {
					length: 0,
					file: {}
				},
				'C': {
					length: 0,
					file: {}
				},
				'D': {
					length: 0,
					file: {}
				},
				'none': {
					length: 0,
					file: {}
				}
			},
			number: 0,
			current: 'none',
			context: {
				'picture_image': '新建 JPG 图像.jpg',
				'Word': '新建 Microsoft Word 文档.docx',
				'PowerPoint': "新建 Microsoft PowerPoint 演示文稿.pptx",
				'excel': '新建 Microsoft Excel 工作表.xlsx',
				'text': "新建 文本文档.txt"
			}
		};
		this.Click = this.Click.bind(this);
		this.Create = this.Create.bind(this);
		this.CreateTable = this.CreateTable.bind(this);
		this.CreateFile = this.CreateFile.bind(this);
	};
	Click(e) {
		this.setState({ number: e[0], current: e[1] });
	}
	Create(e) {
		var target_context = document.getElementsByClassName('create_context')[0];
		var classnames = target_context.className;
		if (classnames.includes('hidden')) {
			target_context.classList.remove('hidden');
		} else {
			target_context.classList.add('hidden');
		};
		target_context = null;
	}
	CreateTable(e) {
		var folder_context = document.getElementsByClassName('folder_context')[0];
		var current = this.state.current;
		var data = this.state.data[current];
		var length = data.length;
		var file = data.file;
		var table = document.createElement('table');
		for (var i = 0; i <= length; i++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < 4; j++) {
				if (i == 0) {
					th = document.createElement('th');
					if (j == 0) {
						th.innerText = '名称';
					} else if (j == 1) {
						th.innerText = '修改日期';
					} else if (j == 2) {
						th.innerText = '类型';
					} else {
						th.innerText = '大小';
					};
					tr.appendChild(th);
				} else {
					td = document.createElement('td');
					var index = i;
					if (j == 0) {
						td.innerText = file[index].name;
					} else if (j == 1) {
						td.innerText = file[index].date;
					} else if (j == 2) {
						td.innerText = file[index].type;
					} else {
						td.innerText = file[index].size;
					};
					tr.appendChild(td);
				};
			};
			table.appendChild(tr);
		};
		folder_context.innerHTML = null;
		folder_context.appendChild(table);
		this.setState({ number: length });
		folder_context = null;
	}
	CreateFile(e) {
		var target = e.currentTarget;
		var file_type = target.id;
		var current = this.state.current;
		var name = this.state.context[file_type];
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var Minutes = date.getMinutes().toString().length == 2 ? date.getMinutes() : '0' + date.getMinutes();
		var file_date = year.toString() + '/' + month.toString() + '/' + day.toString() + ' ' + hour.toString() + ':' + Minutes.toString();
		var index = name.indexOf('.');
		var type = name.slice(3, index);
		if (file_type == 'picture_image') {
			type = type.slice(0, type.indexOf(' '));
		};
		var size = '0 KB';
		var data_context = JSON.parse(JSON.stringify(this.state.data));
		var length = data_context[current].length;
		var pre_file = data_context[current].file;
		var key = length + 1;
		pre_file[key] = {
			name: name,
			date: file_date,
			type: type,
			size: size
		};
		data_context[current].length = length + 1;
		var time1 = setTimeout(() => {
			this.setState({
				data: data_context
			});
			var create = document.getElementsByClassName('create_context')[0];
			create.classList.add('hidden');
			this.CreateTable();
			create = null;
			time1 = null;
		}, 0);
	}
	render() {
		var click = this.Click;
		var context = this.state.current;
		var data = this.state.data;
		var number = this.state.number;
		var Create = this.Create;
		var CreateFile = this.CreateFile;
		return (
			<div id="folderComponent">
				<div>1</div>
				<div id='menu_folder'>
					<div id='create_container'>
						<CreateComponent data={{ id: 'create', class: '', title: '新建', url: '../img/create.png', click: Create }} />
						<div></div>
						<hr />
						<div className="create_context hidden">
							<CreateComponent data={{ id: 'picture_image', class: '', title: '图像', url: '../img/picture_image.png', click: CreateFile }} />
							<CreateComponent data={{ id: 'Word', class: '', title: 'Microsoft Word 文档', url: '../img/Word.png', click: CreateFile }} />
							<CreateComponent data={{ id: 'PowerPoint', class: '', title: 'Microsoft PowerPoint 演示文稿', url: '../img/PowerPoint.png', click: CreateFile }} />
							<CreateComponent data={{ id: 'excel', class: '', title: 'Microsoft Excel 工作表', url: '../img/excel.png', click: CreateFile }} />
							<CreateComponent data={{ id: 'text', class: '', title: '文本文档', url: '../img/text.png', click: CreateFile }} />
						</div>
					</div>
				</div>
				<div>
					<CreateFolderComponent data={{ id: 'home', class: '', url: '../img/home.png', title: '主文件夹', click: click, dom: data }} />
					<CreateFolderComponent data={{ id: 'picture', class: '', url: '../img/picture.png', title: '图库', click: click, dom: data }} />
					<hr />
					<CreateFolderComponent data={{ id: 'desktop_folder', class: '', url: '../img/desktop.png', title: '桌面', click: click, dom: data }} />
					<CreateFolderComponent data={{ id: 'download', class: '', url: '../img/download.png', title: '下载', click: click, dom: data }} />
					<CreateFolderComponent data={{ id: 'document', class: '', url: '../img/document.png', title: '文档', click: click, dom: data }} />
					<CreateFolderComponent data={{ id: 'music', class: '', url: '../img/music.png', title: '音乐', click: click, dom: data }} />
					<CreateFolderComponent data={{ id: 'vedio', class: '', url: '../img/vedio.png', title: '视频', click: click, dom: data }} />
					<hr />
					<CreateFolderComponent data={{ id: 'computer', class: '', url: '../img/computer.png', title: '此电脑', click: click, dom: data }} />
					<CreateFolderComponent data={{ id: 'C', class: '', url: '../img/C.png', title: 'C盘(C:)', click: click, dom: data }} />
					<CreateFolderComponent data={{ id: 'D', class: '', url: '../img/D.png', title: 'D盘(D:)', click: click, dom: data }} />
					<CreateFolderComponent data={{ id: 'network', class: '', url: '../img/network.png', title: '网络', click: click, dom: data }} />
				</div>
				<div class='folder_context'></div>
				<div id='count_menu'>
					<p>{number} 个项目</p>
				</div>
			</div>
		);
	};
};

var click = function (className) {
	var target = this.children;
	if (target.length == 4) {
		var container = document.createElement('div');
		container.className = className;
		this.appendChild(container);
		ReactDOM.render(<FolderComponent />, container);
		container = null;
	} else {
		var className = target[4].className;
		if (className.includes('hidden')) {
			target[4].classList.remove('hidden');
		} else {
			target[4].classList.add('hidden');
		};
	};
};

const recycleReact = <CreateComponent data={{ id: 'recycle', class: '', title: '回收站', url: '../img/recycle.png', click: null }} />;
const dom_menu = (
	<div>
		<CreateComponent data={{ id: 'start', class: '', title: '', url: '../img/start.png', click: null }} />
		<CreateComponent data={{ id: 'folder', class: '', title: '', url: '../img/Folder.png', click: click.bind(screen, 'folder') }} />
		<CreateComponent data={{ id: 'edge', class: '', title: '', url: '../img/edge.png', click: null }} />
	</div>
);
ReactDOM.render(recycleReact, desktop);
ReactDOM.render(dom_menu, menu);
screen = null;
desktop = null;
menu = null;