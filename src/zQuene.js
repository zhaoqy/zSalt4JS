// Copyright zhaoqiying.cn@gmail.com
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/*
 * =======函数执行缓存队列========
 * var zQuene = require('./zQuene');
 * zQuene.add(执行方法, 执行上下文, [参数...]);
 * By zhaoqy 2013年1月15日
 * ===========================
*/

var isFinish = true;

var zQuene = (function(undefined) {
	var Quene = [];
	
	//Clear the buffer events within 1000 milliseconds.
	var processTime = 100;
	
	var id = 0;
	var add = function(fn, context, arrParam) {
		Quene.push({
			fn : fn,
			context : context || {},
			param : arrParam || []
		});
		if (isFinish) {
			start(true);
			isFinish = false;
		}
	};
	function start(excNow) {
		if (excNow) {
			process();
		} else {
			id = setTimeout(function() {
				process();
			}, processTime);
		}
	}

	function process() {
		var quene = Quene.shift();
		if (!quene) {
			isFinish = true;
			clearTimeout(id);
			return;
		}
		quene.fn.apply(quene.context, quene.param);
		start(false);
	}

	function clear(){
		clearTimeout(id);
		Quene = [];
		isFinish = true;
	}
    
	return {
		add : add,
		clear : clear
	};
})();


// 导出模块 
var root = this;
if (typeof exports !== 'undefined') {
	if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = zQuene;
	}
	exports.zQuene = zQuene;
} else {
	root.zQuene = root.zQuene || zQuene;
}
