// Copyright zhaoqiying.cn@gmail.com
// MIT Licensed

/*
 * ===========倒计时===========
 * format:'hh : mm : ss', // 时间显示格式
 * endTime:'2013/01/31 23:59:59' // 结束时间
 * callback:function(){} // 回调函数,返回时间
 * 符合 CommonJS 规范的倒计时工具
 * By zhaoqy 2013年1月6日
 * ===========================
*/

var zTimer = function(option){
	
	var self = this;
	
	// 默认参数
	var defaults = {
		format : 'hh:mm:ss', // 时间显示格式
		startTime : null,
		endTime : '2100/12/31 23:59:59', // 结束时间
		callback : function(){}
	};
	
	// Establish the object that gets returned to break out of a loop iteration.
	var breaker = {};
	
	// Array Object原型
	var ArrayProto = Array.prototype,
	    ObjectProto = Object.prototype;
	
	// obj.length === +obj.length 等价 typeof obj.length === 'number'
	var each = function(obj, iterator, context) {
		if (obj == null) return;
		if (ArrayProto.forEach && obj.forEach === ArrayProto.forEach) {
		  obj.forEach(iterator, context);
		} else if (obj.length === +obj.length) {
		  for (var i = 0, l = obj.length; i < l; i++) {
		    if (iterator.call(context, obj[i], i, obj) === breaker) return;
		  }
		} else {
		  for (var key in obj) {
		    if (ObjectProto.hasOwnProperty.call(obj, key)) {
		      if (iterator.call(context, obj[key], key, obj) === breaker) return;
		    }
		  }
		}
	};
	
	//类型判断方法
	each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
	    self['is' + name] = function(obj) {
	      return ObjectProto.toString.call(obj) == '[object ' + name + ']';
	    };
  	});
	
	// 对象扩展
	var extend = function(obj) {
		each(ArrayProto.slice.call(arguments, 1), function(source) {
		  if (source) {
		    for (var prop in source) {
		      obj[prop] = source[prop];
		    }
		  }
		});
		return obj;
	};
	
	// 初始化数据格式
	var opt = extend({}, defaults, option),
		matdd = /(dd){1}/,
		mathh = /(hh){1}/,
		matmm = /(mm){1}/,
		matss = /(ss){1}/,
		mat = /[^d]*(?:dd)*[^h]*(?:hh)+[^m]*(?:mm)+[^s]*(?:ss)+/;
	
	// 倒计时回掉函数	
	var callback = self.isFunction(opt.callback) ? opt.callback : function(){};
	
	// 重设选项
	self.setOptions = function(option){
		if( !option.format || !mat.test(option.format) ){ 
			option.format = opt.format;
		};
		opt = extend({}, opt, option);
	};		
	
	// 格式不对返回
	if( !mat.test(opt.format) ){ return };
	
	// 剩余时间
	var returnTime = function(){
		var time = calculation( new Date(), opt.endTime, opt.startTime );
		var theMat = opt.format.replace(matdd,time.d).replace(mathh,time.h).replace(matmm,time.m).replace(matss,time.s);
		//返回倒计时时间
		callback( theMat );
	};
	
	// 间隔输出时间
	self.timerId = setInterval( returnTime, 1000 );
	
	//清除定时器
	self.clearInterval = function(){
		clearInterval(self.timerId);
	}
	
	// 计算剩余时间
	function calculation( now, end, start ){
		var theTime = Date.parse(end) - Date.parse(now);
		
		return {
			d : Math.floor( theTime / (1000 * 60 * 60 * 24) ),
			h : Math.floor( theTime / (1000 * 60 * 60) % 24 ),
			m : Math.floor( theTime / (1000 * 60) % 60 ),
			s : Math.floor( theTime / 1000 % 60 )
		};
	};
};

// 导出模块 
var root = this;
if (typeof exports !== 'undefined') {
	if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = zTimer;
	}
	exports.zTimer = zTimer;
} else {
	root.zTimer = root.zTimer || zTimer;
}
