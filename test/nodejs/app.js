

var zTimer = require("./lib/zTimer");
new zTimer({
	format:'hh小时mm分ss秒',
	endTime:'2013/01/31 23:05:59',
	callback:function(time){
		console.log(time);
	}
});