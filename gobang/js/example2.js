function adjoin(list, fn) {
	var temp_list = list.map(fn);
	var result = [];
	list.reduce((prev, cur, index) => {
		if (temp_list[index]) {
			prev.push(cur);
			if (index == list.length - 1) {
				result.push(prev);
			};
			return prev
		} else {
			if (temp_list[index - 1]) {
				result.push(prev);
			};
			prev = [];
			result.push(cur);
			return prev
		};
	}, [])
	console.log(result);
	return result
};
adjoin([1, 2, 3, 4, 5], item => item !== 3); // [[1, 2], 3, [4, 5]]
adjoin([1, 2, 3, 4], item => item < 3); // [[1, 2], 3, 4]