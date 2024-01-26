// 采用递归方法求取n以内质数之和
// Sum >> 输入n，并调用Recursion函数递归计算
// Recursion >> 递归计算质数之和
// isPrime >> 判断n是否质数
function Sum(n) {
	// Sum >> 输入n，并调用Recursion函数递归计算
	var zhishu = Array(n + 1).fill(true);
	zhishu[0] = false;
	zhishu[1] = false;
	var result = 0;
	var index = 2;
	Recursion(zhishu, result, index);
};

function Recursion(list, sum, cur_index) {
	// Recursion >> 递归计算质数之和
	var length = list.length;
	if (cur_index > (length - 1)) {
		console.log(sum);
		return sum
	};
	if (!list[cur_index]) {
		cur_index++;
		Recursion(list, sum, cur_index);
	} else {
		var isprime = isPrime(cur_index);
		if (!isprime) {
			list[cur_index] = false;
		} else {
			sum += cur_index;
		};
		// 任意一个数的正整数(int_number)倍,不是质数,因此对质数列表(list)进行初始化
		var int_number = 2;
		var temp_index = int_number * cur_index;
		while (temp_index < length) {
			list[temp_index] = false;
			int_number++;
			temp_index = int_number * cur_index;
		};
		cur_index++;
		Recursion(list, sum, cur_index);
	};
};

function isPrime(n) {
	// isPrime >> 判断n是否质数
	// 任意一个数，若均不被2至sqrt(n)之内的正整数整除，则这个数为质数
	if (n == 2 || n == 3) {
		return true
	} else if (n > 3) {
		var sqrt_n = parseInt(Math.sqrt(n));
		for (var i = 2; i <= sqrt_n; i++) {
			if (n % i == 0) {
				return false
			};
		};
		return true
	};
};
Sum(5000);