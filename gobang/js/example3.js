// 说明：实现一个ManBehavior，ManBehavior可以有以下一些行为
//    示例：
//    1.ManBehavior(“Hank”)输出:
//    Hi! This is Hank!
//    2.ManBehavior(“Hank”).eat(“dinner”).eat(“supper”)输出
//    Hi This is Hank!
//    Eat dinner~
//    Eat supper~
//    3.ManBehavior(“Hank”).eat('dinner').eatFirst(“lunch”)输出
//    Eat lunch~
//    Hi This is Hank!
//    Eat supper~
// 4.ManBehavior(“Hank”).eat('dinner').eatFirst(“lunch”).eatFirst("breakfast")输出
//     Eat breakfast~
//     Eat lunch~
//     Hi This is Hank!
//     Eat supper~
function ManBehavior(string) {     // 执行函数，通过Eat构造函数，创建一个实例对象person，并返回该对象
	var Eat = function (str) {   // Eat >> 构造函数,在Eat原型上定义了greet、eat和eatFirst三种方法					
		this.name = string;
		this.context = {
			'Hank': "Hi! This is Hank!",
			'dinner': "Eat supper~",
			'lunch': "Eat lunch~",
			'breakfast': "Eat breakfast~",
			'supper': "Eat dinner~"
		};
		this.result = {
			eat_first: [],
			eat: []
		};
		this.promise = null;
	};
	Eat.prototype.greet = function () {   //Eat原型上greet方法：输出实例person的私有属性，创建promise对象，并将其设置为person的私有属性
		var promise = new Promise((resolve, reject) => {
			var time=setTimeout(() => {     // 将 ManBehavior('Hank') 加入宏任务队列
				var name = this.name;
				var context = this.context;
				console.log(context[name]);
				clearTimeout(time);
			}, 0);
			resolve();
		});
		this.promise = promise;
		return
	};
	Eat.prototype.eat = function (str) {    //Eat原型上eat方法，获取person对象的promise私有属性，返回person对象
		var promise = this.promise;
		var context = this.context;
		var result = this.result;
		promise.then(() => {
			var time1=setTimeout(() => {    // 将 .eat('xxx') 加入宏任务队列，使之较 ManBehavior('Hank') 后输出
				async function add(str1) {
					await 1
					var time2=setTimeout(() => {    // 构建宏任务,倒序输出person私有属性result中存储的参数
						var value = result.eat.pop();
						console.log(value);
						clearTimeout(time2);
					}, 0);
				};
				add(str);
				result.eat.push(context[str]);  // 先将要输出的内容加入person私有属性result
				clearTimeout(time1);
			}, 0);
		});
		this.promise = promise;
		return person
	};
	Eat.prototype.eatFirst = function (str) {     //Eat原型上eatFirst方法，获取person对象的promise私有属性，返回person对象
		var promise = this.promise;
		var context = this.context;
		var result = this.result;
		promise.then(() => {    // 将 .eatFirst('xxx') 加入微任务队列，使之较 ManBehavior('Hank') 先输出
			async function add(str1) {
				await 1    // 构建微任务,倒序输出person私有属性result中存储的参数
				var value = result.eat_first.pop();
				console.log(value);
			};
			add(str);
			result.eat_first.push(context[str]);   // 先将要输出的内容加入person私有属性result
		});
		this.promise = promise;
		return person
	};
	var person = new Eat(string);
	person.greet();
	return person
};
ManBehavior('Hank');  // Hi! This is Hank!
ManBehavior('Hank').eat('dinner').eat('supper');
ManBehavior('Hank').eat('dinner').eatFirst('lunch');
ManBehavior('Hank').eat('dinner').eatFirst('lunch').eatFirst('breakfast');