const express = require('express');
const socket = require('socket.io');
const http = require('http');
const cors = require('cors');
const request = require('request');
const port = '3000'



// Init app
const app = express();
const server = app.listen(port, () => {
    console.log(`listening for request on port ${port}`)
});

app.use(cors())

// Static files
app.use(express.static('public'))

app.get('/get_chats', (request, response) => {
    http.get("http://localhost:5000/chats", resp =>{
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                response.json(JSON.parse(data))
            });
        })
})

// Socket setup
const io = socket(server);


io.on('connection', socket => {
    socket.on('getchats', data => {
        
    })
    socket.on('chat', data => {
        console.log(data)
        request.post(
            'http://localhost:5000/new_chat',
            { json: data },
            function (error, response, body) {
                if (!error && response.statusCode == 201) {
                    console.log(body);
                    io.sockets.emit('chat', data);
                }
            }
        );

    })
});