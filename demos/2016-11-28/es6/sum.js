/**
 * Created by yakuncyk on 2016/11/28.
 */
// sum.js
"use strict";

import add from './add';
import reduce from './reduce';

export default function sum(arr){
	return reduce(arr, add);
}

// 新功能2