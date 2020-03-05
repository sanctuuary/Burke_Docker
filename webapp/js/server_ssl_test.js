var https = require('https');
var fs = require("fs");

var https_options = {

  key: fs.readFileSync('keys/ape.key'),

  cert: fs.readFileSync('keys/ape.crt'),

  ca:  fs.readFileSync('keys/ca.crt')
};

https.createServer(https_options, function(request, response) {
  if(/(.*?).css$/.test(request.url.toString())){
     sendFileContent(response, '../css/stylesheet.css', "text/css");
  }else if(/(.*?).js$/.test(request.url.toString())){
    sendFileContent(response, request.url.toString().substring(1), "text/javascript");
  }else if(/(.*?).html$/.test(request.url.toString())){
    sendFileContent(response, request.url.toString().substring(1), "text/html");
  }else if(request.url.toString().substring(1) == ''){
    sendFileContent(response, "index.html", "text/html");
  }
}).listen(8080, "0.0.0.0");

function sendFileContent(response, fileName, contentType){
  fs.readFile(fileName, function(err, data){
    if(err){
      response.writeHead(404);
      response.write("Not Found!");
    }
    else{
      response.writeHead(200, {'Content-Type': contentType});
      response.write(data);
    }
    response.end();
  });
}
