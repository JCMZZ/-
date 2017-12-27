var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/client.html");
})
var server = app.listen(8181,function(){
    var port = server.address().port;
    var address = server.address().address;
    console.log(address+" 端口号为"+port);
})