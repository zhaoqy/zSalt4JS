

require(['js/utils/zTimer.js'], function(){
	new zTimer({
		format:'hh小时mm分ss秒',
		endTime:'2013/12/31 23:05:59',
		callback:function(time){
			$("#timer").html(time);
		}
	});
});