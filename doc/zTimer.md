// * 符合 CommonJS 规范的倒计时工具 *

// nodejs && titanium mobile

var zTimer = require('./src/zTimer');

var options = {
  format:'hh : mm : ss', // 时间显示格式
  endTime:'2013/01/31 23:59:59', // 结束时间
  callback:function(time){
  	console.log(time);
  } // 回调函数,返回时间
}

//use
var timer = new zTimer(options);

timer.setOptions({
	endTime:'2013/05/31 23:59:59'// 结束时间
});


//web require.js

require(['js/utils/zTimer.js'], function(){
	new zTimer({
		format:'hh小时mm分ss秒',
		endTime:'2013/12/31 23:05:59',
		callback:function(time){
			$("#timer").html(time);
		}
	});
});