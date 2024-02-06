var http=require('http');
var server =http.createServer((req,res)=>{
    res.writeHead((200),{'content-type':'text/plain'});

    res.end('Hello World!');
});
server.listen(8000);
console.log('Server running at http://127.0.0.1:8000');