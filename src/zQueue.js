/*
 * =======执行缓存队列========
 * var zQuene = require('./zQuene');
 * zQuene.add(执行方法, 执行上下文, [参数...]);
 * By zhaoqy 2013年1月15日
 * ===========================
*/

var isFinish = true;

var zQuene = (function(undefined) {
	var Quene = [];
	
	//Clear the buffer events within 1000 milliseconds.
	var processTime = 1000;
	
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
		quene = [];
		start(false);
	}

	return {
		add : add
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
