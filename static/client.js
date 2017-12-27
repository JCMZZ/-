	import './client.css';
	var aapl = new Array();
	var msft = new Array();
	var amzn = new Array();
	var goog = new Array();
	var yhoo = new Array();
	for(var i=0;i<10;i++){
		aapl.push(getdata(35));
		msft.push(getdata(25));
		amzn.push(getdata(40));
		goog.push(getdata(55));
		yhoo.push(getdata(30));
	}
	var t1 = $("#t1");
	t1.text(aapl[aapl.length-1]);
	var t2 = $("#t2");
	t2.text(msft[msft.length-1]);
	var t3 = $("#t3");
	t3.text(amzn[amzn.length-1]);
	var t4 = $("#t4");
	t4.text(goog[goog.length-1]);
	var t5 = $("#t5");
	t5.text(yhoo[yhoo.length-1]);
	function change(t,g){
		var a = t.text();
		(g>a || g==a)?(t.addClass('bg')):(t.removeClass('bg'));
		t.text(g);
	}
	var isopen = false;
	$("#open").click(()=>{
		if(isopen) return;
		var ws = new WebSocket('ws://localhost:880');
		ws.onopen = function(e){
			console.log('Connection to server opened');
			ws.send('请求消息');
		}
		var a=0;
		ws.onmessage = function(e){
			var obj = JSON.parse(e.data);
			change(t1,obj.AAPL);
			change(t2,obj.MSFT);
			change(t3,obj.AMZN);
			change(t4,obj.GOOG);
			change(t5,obj.YHOO);
			aapl.shift()
			aapl.push(obj.AAPL);
			msft.shift()
			msft.push(obj.MSFT);
			amzn.shift()
			amzn.push(obj.AMZN);
			goog.shift()
			goog.push(obj.GOOG);
			yhoo.shift()
			yhoo.push(obj.YHOO);
			a++;
			a==10 && ($('#container').highcharts(json),a=0);
			isopen = true;
		}
		$("#close").click(()=>{
			isopen = false;
			ws.close();
		});
		ws.onclose = function(){
			isopen = false;
			alert("服务器关闭！");
		}
	});
	function getdata(num){
		return num-(Math.floor(Math.random() * (150 - -80 + 1) + -150))/100;
	}

   var title = {
      text: '股票走势图'   
   };
   var subtitle = {
      text: '上海证券'
   };
   var xAxis = {
      categories: ['一', '二', '三', '四', '五', '六',
         '七', '八', '九', '十', '十一', '十二']
   };
   var yAxis = {
      title: {
         text: '单位:人民币(CNY)'
      },
      plotLines: [{
         value: 1,
         width: 1,
         color: '#eee'
      }]
   };   

   var tooltip = {
      valueSuffix: '元'
   }

   var legend = {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
   };

   var series =  [
      {
         name: 'AAPL',
         data:aapl
      }, 
      {
         name: 'MSFT',
         data: msft
      },
      {
         name: 'AMZN',
         data: amzn
      },
      {
         name: 'GOOG',
         data: goog
      },
      {
         name: 'YHOO',
         data: yhoo
      }
   ];

   var json = {};
   json.title = title;
   json.subtitle = subtitle;
   json.xAxis = xAxis;
   json.yAxis = yAxis;
   json.tooltip = tooltip;
   json.legend = legend;
   json.series = series;
   $('#container').highcharts(json);