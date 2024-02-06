const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Request log is ' + new Date());
    next();
});

app.post('/hi', (req, res) => {
    res.send('Hi: ' + JSON.stringify(req.body));
});
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/hi/:user', (req, res) => {
    res.send('Hi: ' + req.params.user);
});

app.get(/^\/Hi\/(\d+)$/, (req, res) => {
    res.send('Hi: id=' + req.params[0]);
});

app.use((req,res,next)=>{
    res.send('404 Not Found');
});
app.listen(8080, () => {
    console.log('Example App listening on port 8000');
});