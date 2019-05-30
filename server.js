// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.end('This is my first response');
// });

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

app.post('/api/register',(req, res) =>{

    console.log(res.body)
})



app.listen(1234,() => console.log('server listening at 1234'))

// server.listen(process.env.PORT || 3000);
