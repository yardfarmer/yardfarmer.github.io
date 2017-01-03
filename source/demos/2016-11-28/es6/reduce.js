/**
 * Created by yakuncyk on 2016/11/28.
 */
//reduce.js
"use strict";

export default function reduce(arr, iteratee) {
	let index = 0,
		length = arr.length,
		memo = arr[index];

	index += 1;
	for(; index < length; index += 1){
		memo = iteratee(memo, arr[index]);
	}
	return memo;
}

// 新功能1