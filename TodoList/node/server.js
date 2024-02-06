var express=require('express');
var bodyParser=require('body-parser');
var server=express();

server.use(bodyParser.json());

var todoItems = [
    { id: 0, value: 'React', done: false, delete: false }
  ];

server.all('*', (req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    next();
});
server.get('/items', (req, res)=>{
    res.send(todoItems);
});

server.post('/items', (req, res)=>{
    if (req.body.todoItem) {
        todoItems=[...todoItems,req.body.todoItem];
    };
    res.send(todoItems);
});

server.delete('/items', (req, res)=>{
    if (req.body.id) {
        todoItems.forEach(item=>{
            if (item.id===req.body.id) {
                item.delete=true;
            };
        });
    };
    res.send(todoItems);
});
server.listen(8000,()=>{
    console.log('Server running on http://127.0.0.1:8000');
});