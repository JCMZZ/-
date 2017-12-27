var WebSocketServer = require('ws').Server;

var stocks = {
    "AAPL": 35.0,
    "MSFT": 25.0,
    "AMZN": 40.0,
    "GOOG": 55.0,
    "YHOO": 30.0
};
var stockUpdater;
function randomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var randomStockUpdater = function() {
    for (var symbol in stocks) {
        if(stocks.hasOwnProperty(symbol)) {
            var randomizedChange = randomInterval(-80, 150);
            var floatChange = randomizedChange / 100;
            var noww = stocks[symbol] + floatChange;
            stocks[symbol] = Math.round(noww*1000)/1000;
        }
    }
    var randomMSTime = randomInterval(500, 2500);
    stockUpdater = setTimeout(function() {
        randomStockUpdater();
    }, randomMSTime);
}
randomStockUpdater();


wss = new WebSocketServer({port:880});
wss.on('connection',function(ws){
	console.log('client connected');
    ws.on('message', function (message) {
       console.log("收到消息", message);
    });
    console.log(ws.readyState);
	var timer = setInterval(function(){
   	    ws.send(JSON.stringify(stocks));
	},3000);
	ws.on('close',function(){
		clearInterval(timer);
	})
});